const ConfigFile = require('config');

module.exports.incoming = (event, context, callback) => {
  // Detect event stage. Stripe will return 'test' or 'live'
  // Default to 'test' stage if requestContext is not found
  const requestContextStage = event.requestContext ? event.requestContext.stage : 'test';

  // Load Stripe api key based on detected stage ('test' or 'live')
  const stripeApiKey =
    requestContextStage === 'test'
    ? ConfigFile.stripe.test_sk
    : ConfigFile.stripe.live_sk;
  const stripe = require('stripe')(stripeApiKey);

  try {
    // Parse Stripe event
    const jsonData = JSON.parse(event.body); // https://stripe.com/docs/api#event_object

    // Verify the event by fetching it from Stripe
    console.log("Stripe Event: ", jsonData);
    stripe.events.retrieve(jsonData.id, (err, stripeEvent) => {

      // Get event type, set to '' if event type is not provided
      const eventType = stripeEvent.type ? stripeEvent.type : '';
      console.log("Event Type: ", eventType);

      // Create response object
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Stripe webhook incoming!',
          stage: requestContextStage,
        }),
      };

      // Detect event type and respond to events accordingly
      switch (eventType) {
        case 'invoice.created':
          // invoice.created event
          break;
        default:
          break;
      }

      // Return response object via callback
      callback(null, response);
    });
  } catch (err) {
    // if anything goes wrong, respond with a 501 error
    callback(null, {
      statusCode: err.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Internal server error',
    });
  }
};