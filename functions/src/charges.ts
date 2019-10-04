import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from './helpers';
import { stripe, db } from './config';
import { getCustomer, getOrCreateCustomer } from './customers';
import { attachSource } from './sources';

/**
 * Get a user's charge history
 */

export const getUserCharges = async (uid: string, limit?: number) => {
  const customer = await getCustomer(uid);

  return await stripe.charges.list({
    limit,
    customer,
  });
};

/**
 * Create a charge for a specific amount
 */
/**
Creates a charge for a specific amount
*/
export const createCharge = async (
  uid: string,
  product_id: string,
  source: string,
  amount: number,
  firstName?: string,
  lastName?: string,
  idempotency_key?: string,
) => {
  console.log('Creating customer...');

  console.log('UID FOR TESTING: ', uid);

  const customer = await getOrCreateCustomer(uid);

  await attachSource(uid, source);

  // TODO: Verify that product_id exists in DB, if not return error

  console.log('Creating charge....');

  const charge = await stripe.charges.create(
    {
      amount,
      customer: customer.id,
      source,
      metadata: { product_id },
      currency: 'usd',
    },

    { idempotency_key },
  );

  console.log('Creating batch write...');

  // [START: Batch write purchase info and name ]
  const batch = db.batch();
  // Add purchase info to accounts doc

  const accountsRef = await db.doc(`accounts/${uid}`);
  batch.update(accountsRef, { purchases: admin.firestore.FieldValue.arrayUnion(product_id) });

  // Update firstName and lastName if provided
  if (firstName && lastName) {
    const usersRef = await db.doc(`users/${uid}`);
    batch.set(usersRef, { firstName, lastName }, { merge: true });
  }

  // Run batch write
  console.log('Committing batch write');

  await batch.commit();
  return charge;
};

// DEPLOYABLE FUNCTIONS //

export const stripeCreateCharge = functions.https.onCall(async (data, context) => {
  console.log('Fetching parameters...');

  const uid = assertUID(context);
  const source = assert(data, 'source');
  const amount = assert(data, 'amount');
  const product_id = assert(data, 'product_id');

  // Optional
  const { firstName, lastName, idempotency_key } = data;

  return catchErrors(
    createCharge(uid, product_id, source, amount, firstName, lastName, idempotency_key),
  );
});

export const stripeGetCharges = functions.https.onCall(async (data, context) => {
  const uid = assertUID(context);
  return catchErrors(getUserCharges(uid));
});
