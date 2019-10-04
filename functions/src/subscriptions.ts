import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from './helpers';
import { stripe, db } from './config';
import { getOrCreateCustomer, getCustomer } from './customers';
import { attachSource } from './sources';

/**
 * Gets a user's subscriptions
 */
export const getSubscriptions = async (uid: string) => {
  const customer = await getCustomer(uid);
  return stripe.subscriptions.list({ customer });
};

/**
 * Creates and charges user for a new subscription
 */
export const createSubscription = async (
  uid: string,
  source: string,
  plan: string,
  coupon?: string,
  firstName?: string,
  lastName?: string,
) => {
  // Get or create a customer using the user's uid
  const customer = await getOrCreateCustomer(uid);

  // Attach source to customer
  await attachSource(uid, source);

  // Create subscription with Stripe APi
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    coupon,
    items: [
      {
        plan,
      },
    ],
  });

  // [Start: Batch write subscription and profile info]
  const batch = db.batch();
  // Add subscription id to accounts and set subscribed to true
  const accountsRef = await db.doc(`accounts/${uid}`);

  batch.set(
    accountsRef,
    {
      subscribed: true,
    },
    { merge: true },
  );

  const subscriptionsRef = await db
    .doc(`accounts/${uid}`)
    .collection('subscriptions')
    .doc(`${[subscription.id]}`);

  batch.set(subscriptionsRef, {
    [subscription.id]: 'active',
  });

  // Update firstName and lastName if provided
  if (firstName && lastName) {
    const usersRef = await db.doc(`users/${uid}`);
    batch.set(usersRef, { firstName, lastName }, { merge: true });
  }

  // Run batch write
  await batch.commit();
  return subscription;
};

/**
 * Cancels a subscription and stops all recurring payments
 */
export async function cancelSubscription(uid: string, subId: string): Promise<any> {
  // Delete subscription via Stripe API
  const subscription = await stripe.subscriptions.del(subId);

  // [Start: Batch write canceled subscription info]
  const batch = db.batch();

  // Set subscribed to false and set subscription status to canceled
  const accountsRef = await db.doc(`accounts/${uid}`);
  batch.set(
    accountsRef,
    {
      subscribed: false,
      [subId]: 'canceled',
    },
    { merge: true },
  );

  // TODO: Update with new data structure of storing subs in subscollection
  // Run batch write
  await batch.commit();
  return subscription;
}

// DEPLOYABLE FUNCTIONS

export const stripeCreateSubscription = functions.https.onCall(async (data, context) => {
  const uid = assertUID(context);
  const source = assert(data, 'source');
  const plan = assert(data, 'plan');

  // Optional parameters
  const { coupon, firstName, lastName } = data;
  return catchErrors(createSubscription(uid, source, plan, coupon, firstName, lastName));
});

export const stripeCancelSubscription = functions.https.onCall(async (data, context) => {
  const uid = assertUID(context);
  const plan = assert(data, 'plan');
  return catchErrors(cancelSubscription(uid, plan));
});

export const stripeGetSubscriptions = functions.https.onCall(async (data, context) => {
  const uid = assertUID(context);
  return catchErrors(getSubscriptions(uid));
});
