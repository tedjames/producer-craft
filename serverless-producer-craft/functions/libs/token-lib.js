/*
token-lib.js - token fetching helper
- Securely fetches secret keys and tokens from AWS SSM parameter storage
- Accepts tokenName as parameter. Ex) 'stripeSecret', 'firebaseSecret'
*/
import AWS from 'aws-sdk';
const ssm = new AWS.SSM();

export function fetchToken(tokenName, callback) {
  // Fetches a token with "tokenName" from SSM parameter store
  // Requires a policy for SSM:GetParameter on the parameter being read.
  const params = {
      Name: tokenName,
      WithDecryption: false
  };

  const token = ssm.getParameter(params, (err, data) => 
    err ? console.log(err, err.stack) : console.log(data));

  return callback(token);
}