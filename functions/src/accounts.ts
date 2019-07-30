import * as functions from 'firebase-functions';
import { db } from './config';

export const createUserEvent = functions.auth.user().onCreate(async user => {
  const { uid, email } = user;
  // checks if user had an old account and restores purchases
  db.collection('accounts')
    .where('email', '==', email)
    .get()
    .then(snapshot => {
      if (!snapshot.empty) {
        console.log('Old account found!');
        snapshot.forEach(async doc => {
          // [Start: Batch write purchase recovery info and delete old account]
          const purchaseRecoveryBatch = db.batch();

          // Add purchases to new account object if found in old account
          const newAccountsRef = await db.collection('accounts').doc(uid);
          purchaseRecoveryBatch.set(
            newAccountsRef,
            { purchases: doc.data().purchases || null },
            { merge: true },
          );

          // Delete old account object
          const oldAccountRef = await db.collection('accounts').doc(doc.data().uid);
          purchaseRecoveryBatch.delete(oldAccountRef);
          // Run batch write
          await purchaseRecoveryBatch.commit();
        });
      }
    })
    .catch(err => {
      console.log('No old account found', err);
    });

  // writes uid, email, username and roles to db atomically
  const batch = db.batch();
  const usersRef = db.collection('users').doc(uid);
  batch.set(usersRef, { uid, email });
  const accountsRef = db.collection('accounts').doc(uid);
  batch.set(accountsRef, { uid, roles: ['student'] }, { merge: true });
  return await batch.commit();
});

export const deleteUserEvent = functions.auth.user().onDelete(async user => {
  const { uid, email } = user;
  // back up email so user can recover subscriptions if they make an account again
  const batch = db.batch();
  const accountsRef = db.collection('accounts').doc(uid);
  batch.set(accountsRef, { email }, { merge: true });
  // delete user object to remove personal information
  const usersRef = db.collection('users').doc(uid);
  batch.delete(usersRef);
  // delete profile object (includes display name and thumbnail)
  const profileRef = db.collection('profiles').doc(uid);
  batch.delete(profileRef);
  return await batch.commit();
  //TODO: Delete user's thumbnail from storage bucket
});
