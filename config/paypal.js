const paypal = require("@paypal/checkout-server-sdk");

// Setup environment
function environment() {
  let clientId = process.env.PAYPAL_CLIENT_ID;
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  // 👉 switch to LiveEnvironment for production
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client };
