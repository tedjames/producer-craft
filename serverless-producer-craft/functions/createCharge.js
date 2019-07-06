import Stripe from "stripe";
import { success, failure } from "./libs/response-lib";

export async function handler(event, context) {
  // Parse request body
  const { storage, source, description, courseId } = JSON.parse(event.body);

  // Fetch amount from Firestore using courseId
  const amount = 100;

  // Pass secret key to Stripe from env variables
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // Create Stripe charge
  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return success({ status: true });
  } catch (error) {
    return failure({ message: error.message });
  }
}
