import { assert } from './helpers';
import { db, stripe } from './config';

/**
 Read the user document from Firestore
 */
export const getUser = async (uid: string) => {
  return await db
    .collection('accounts')
    .doc(uid)
    .get()
    .then(doc => doc.data());
};

/**
 Gets a customer from Stripe
 */

export const getCustomer = async (uid: string) => {
  console.log('UID RECEIVED BY getCustomer', uid);
  const user = await getUser(uid);
  // If customer ID does not exists, return an error
  return assert(user, 'stripeCustomerId');
};

/**
 Updates the user document
 */
export const updateUser = async (uid: string, data: Object) => {
  return await db
    .collection('accounts')
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
  console.log('UID RECEIVED BY getOrCreateCustomer', uid);

  const user = await getUser(uid);
  console.log('USER RECEIVED BY getOrCreateCustomer', user);
  const customerId = user && user.stripeCustomerId;
  console.log('CUSTOMER ID RECEIVED BY getOrCreateCustomer', customerId);

  // Create a new one if customerId is missing from db
  if (!customerId) {
    console.log('NO CUSTOMER FOUND BY getOrCreateCustomer... CREATING NEW CUSTOMER');
    return createCustomer(uid);
  } else {
    console.log('CUSTOMER ID FOUND BY getOrCreateCustomer... RETRIEVING', user);
    return stripe.customers.retrieve(customerId);
  }
};
