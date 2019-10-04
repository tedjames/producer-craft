import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from './helpers';
import { stripe, db } from './config';
import { getOrCreateCustomer } from './customers';

/**
Attaches a payment source to a stripe customer account.
*/
export const attachSource = async (uid: string, source: any) => {
  console.log('UID RECEIVED BY attachSource', uid);

  const customer = await getOrCreateCustomer(uid);

  console.log('CUSTOMER RECEIVED BY attachSource', customer);
  console.log('CHECKING CUSTOMER ID IN attachSource...');
  console.log('CUSTOMER ID = ', customer.id);

  // check if source already exists
  const existingSource = customer.sources.data.filter(s => s.id === source).pop();

  if (existingSource) {
    // if source already exists, return the existing source
    return existingSource;
  } else {
    // existing source not found, need to create source with Stripe API
    const customerId = customer.id;
    console.log('Creating source with Stripe API using id: ', customerId);

    await stripe.customers.createSource(customerId, { source });
    console.log('Source created!');

    // update default source
    return await stripe.customers.update(customerId, { default_source: source });
  }
};

export const getSources = async (uid: string) => {
  const customer = await getOrCreateCustomer(uid);

  // Get cards from Stripe
  const sources = await stripe.customers.listSources(customer.id, { object: 'card' });

  // Return all sources and default card if available
  try {
    const accountSnapshot = await db
      .collection('accounts')
      .doc(uid)
      .get();
    const defaultCard = accountSnapshot.data().defaultCard;
    return { ...sources, defaultCard };
  } catch {
    return { ...sources };
  }
};

// WARNING: DEPLOYABLE FUNCTIONS //

export const stripeAttachSource = functions.https.onCall(async (data, context) => {
  const uid = assertUID(context);
  const source = assert(data, 'source');

  return catchErrors(attachSource(uid, source));
});

export const stripeGetSources = functions.https.onCall(async (data, context) => {
  const uid = assertUID(context);
  return catchErrors(getSources(uid));
});
