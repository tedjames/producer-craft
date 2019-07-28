import { assert } from './helpers';
import { db, stripe } from './config';

/**
 Read the user document from Firestore
 */
export const getUser = async (uid: string) => {
  return await db
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => doc.data());
};

/**
 Gets a customer from Stripe
 */

export const getCustomer = async (uid: string) => {
  const user = await getUser(uid);
  // If customer ID does not exists, return an error
  return assert(user, 'stripeCustomerId');
};

/**
 Updates the user document
 */
export const updateUser = async (uid: string, data: Object) => {
  return await db
    .collection('users')
    .doc(uid)
    .set(data, { merge: true });
};

/**
Takes a Firebase user and creates a Stripe customer account
 */
export const createCustomer = async (uid: any) => {
  const customer = await stripe.customers.create({
    metadata: { firebaseUID: uid },
  });

  await updateUser(uid, { stripeCustomerId: customer.id });

  return customer;
};

/**
 Gets uid from Firestore and fetches customer object from Stripe or makes a customer if id is not in db.
 */

export const getOrCreateCustomer = async (uid: string) => {
  // Read the stripe customer ID from firestore
  const user = await getUser(uid);
  const customerId = user && user.stripeCustomerId;

  // Create a new one if customerId is missing from db
  if (!customerId) {
    return createCustomer(uid);
  } else {
    return stripe.customers.retrieve(customerId);
  }
};
