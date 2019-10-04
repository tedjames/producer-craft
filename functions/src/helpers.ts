import * as functions from 'firebase-functions';

/**
Validates data payload of a callable function
*/
export const assert = (data: any, key: string) => {
  if (!data[key]) {
    throw new functions.https.HttpsError('invalid-argument', `function called without ${key} data`);
  } else {
    return data[key];
  }
};

/**
Validates auth context for callable function
*/
export const assertUID = (context: any) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'function called without context.auth',
    );
  } else {
    return context.auth.uid;
  }
};

/**
Validates an email for callable function
*/
export const assertEmail = (data: any, key: string) => {
  const email = data[key];
  if (!email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return email;
  } else {
    throw new functions.https.HttpsError('permission-denied', 'Invalid email');
  }
};

/**
Sends a descriptive error response when running a callable function
*/
export const catchErrors = async (promise: Promise<any>) => {
  try {
    return await promise;
  } catch (err) {
    console.log(err);
    throw new functions.https.HttpsError('unknown', err);
  }
};
