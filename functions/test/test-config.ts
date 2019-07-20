import * as TestFunctions from 'firebase-functions-test';
import STRIPE_SECRET from './stripe-account';

const firebaseConfig = {
  apiKey: 'AIzaSyC51eVN6j-fJoqVvNiig3v3hUdeQdvNdVE',
  authDomain: 'producer-craft.firebaseapp.com',
  databaseURL: 'https://producer-craft.firebaseio.com',
  projectId: 'producer-craft',
  storageBucket: 'producer-craft.appspot.com',
  messagingSenderId: '495964428761',
  appId: '1:495964428761:web:ca7330892d6cd34c',
};

const envConfig = { stripe: { secret: STRIPE_SECRET } };

// make sure path to service-account works
const fun = TestFunctions(firebaseConfig, 'service-account.json');

fun.mockConfig(envConfig);

export { fun };
