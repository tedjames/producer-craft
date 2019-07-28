import * as functions from 'firebase-functions';
import { assert, assertUID, catchErrors } from './helpers';
import { stripe } from './config';
import { getOrCreateCustomer } from './customers';

/**
Attaches a payment source to a stripe customer account.
*/
export const attachSource = async (uid: string, source: string) => {
  const customer = await getOrCreateCustomer(uid);

  // check if source already exists
  const existingSource = customer.sources.data.filter(s => s.id === source).pop();

  if (existingSource) {
    // if source already exists, return the existing source
    return existingSource;
  } else {
    // existing source not found, need to create sourcce with Stripe API
    await stripe.customers.createSource(customer.id, { source: source });
    // update default source
    return await stripe.customers.update(customer.id, { default_source: source });
  }
};

// WARNING: DEPLOYABLE FUNCTIONS //

export const stripeAttachSource = functions.https.onCall(async (data, context) => {
  const uid = assertUID(context);
  const source = assert(data, 'source');

  return catchErrors(attachSource(uid, source));
});
