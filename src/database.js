import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const perf = firebaseApp.performance();

db.enablePersistence({ synchronizeTabs: true })
  .then(() => console.log('Persistence Enabled'))
  .catch(err => console.log('Unable to configure persistence: ', err));

export { db, perf };
