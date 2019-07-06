import { success, failure } from "./libs/response-lib";
import Stripe from "stripe";

export const handler = async (event, context) => {
  // Initialize Stripe with secret key
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // Parse request body; stripeToken is generated on client side via StripeJS package
  // stripeToken contains encrypted billing and address details
  const { stripeToken, email, productPlan, customerId } = JSON.parse(event.body);

  // If customerId is not provided, create a customer
  if (!customerId) {
    try {
      // Create customer using email and source / stripe token from client
      const customer = await stripe.customers.create({
        email: email,
        source: stripeToken
      });
      // Update customerId variable with new customerId
      return customerId = customer.id;
    } catch(err) {
      // If unsuccessful, return failure() response with error message
      return failure ({ message: err.message })
    }
  } else {
    // Create and process payment for subscription charge

    // If successful, subscribe to plan and update course ownership in DB
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ plan: productPlan }]
    });

    // If unsuccessful, return failure() response with error message
  }
};


// export async function handler(event, context) {
//   // Parse request body
//   const { storage, source, description } = JSON.parse(event.body);

//   // Calculate amount to be charged
//   const amount = calculateCost(storage);

//   // Pass secret key to Stripe from env variables
//   const stripe = stripePackage(process.env.stripeSecretKey);

//   // Create Stripe charge
//   try {
//     await stripe.charges.create({
//       source,
//       amount,
//       description,
//       currency: "usd"
//     });
//     return success({ status: true });
//   } catch (error) {
//     return failure({ message: error.message });
//   }
// }

