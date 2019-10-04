import { db, stripe } from './config';
import * as functions from 'firebase-functions';

export const stripeWebhookSignature = functions.config().stripe.webhook_signature;

export const webhookHandler = async (data: any) => {
  console.log('Request data: ', data);

  const customerId = data.customer;
  const subId = data.subscription || data.id;
  const customer = await stripe.customers.retrieve(customerId);
  const uid = customer.metadata.firebaseUID;

  try {
    // Get subscription info from strip
    console.log('Fetching sub from stipe with: ', data);

    const subscription = await stripe.subscriptions.retrieve(subId);
    console.log('Subscription retrieved');

    // Prepare batch write
    const batch = db.batch();

    // Update subscription status
    const subscriptionsRef = await db
      .doc(`accounts/${uid}`)
      .collection('subscriptions')
      .doc(`${subId}`);

    batch.set(subscriptionsRef, {
      [subId]: subscription.status,
    });

    // Set subscribed to false
    const accountsRef = await db.doc(`accounts/${uid}`);
    batch.set(
      accountsRef,
      { subscribed: subscription.status === 'active' ? true : false },
      { merge: true },
    );

    // Run batch write
    await batch.commit();
  } catch (err) {
    console.log('Error: ', err);
    throw new functions.https.HttpsError('permission-denied', err);
  }
};

export const invoiceWebhookEndpoint = functions.https.onRequest(async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent((req as any).rawBody, sig, stripeWebhookSignature);
    const data = event.data.object;

    await webhookHandler(data);

    res.sendStatus(200);
  } catch (err) {
    console.log('Error caught elsewhere: ', err);
    res.status(400).send(err);
  }
});
