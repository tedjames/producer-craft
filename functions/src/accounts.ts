import * as functions from 'firebase-functions';
import { db } from './config';
import { catchErrors, assertEmail } from './helpers';

const saveEmail = async (email: string, context: any) => {
  // 1. Check if auth context is available, if so - throw error
  if (context.auth) {
    throw new functions.https.HttpsError('permission-denied', 'User already has an account');
  }
  // 2. Check if email already exists in emails collection, if so - throw error
  const snapshot = await db
    .collection('emails')
    .where('email', '==', email)
    .get();

  if (!snapshot.empty) {
    throw new functions.https.HttpsError('permission-denied', 'Email already added');
  } else {
    // 3. Else, add email to a new doc in emails collection
    await db
      .collection('emails')
      .doc(email)
      .set({ email });
  }
};

// DEPLOYABLE FUNCTIONS //

export const saveAnonymousUser = functions.https.onCall(async (data, context) => {
  const email = assertEmail(data, 'email');

  return catchErrors(saveEmail(email, context));
});

export const createUserEvent = functions.auth.user().onCreate(async user => {
  const { uid, email, displayName } = user;
  // Create profile for user with uid and username
  await db
    .collection('profiles')
    .doc(uid)
    .set({ uid, username: displayName });
  // Delete email if previously saved in database
  await db
    .collection('emails')
    .doc(email)
    .delete();
  // checks if user had an old account and restores purchases
  const snapshot = await db
    .collection('accounts')
    .where('email', '==', email)
    .get();

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

const updateDisplayName = async (profileId: string, username: string) => {
  return await admin.auth().updateUser(profileId, {
    displayName: username,
  });
};

export const updateUsernameEvent = functions.firestore
  .document('profiles/{profileId}')
  .onWrite(async (snap, context) => {
    const { profileId } = context.params;
    const { username } = snap.after.data();
    return catchErrors(updateDisplayName(profileId, username));
  });

const updateEmail = async (userId: string, email: string) => {
  return await admin.auth().updateUser(userId, {
    email,
  });
};

export const updateUserEvent = functions.firestore
  .document('users/{userId}')
  .onWrite(async (snap, context) => {
    const { userId } = context.params;
    const { email } = snap.after.data();
    return catchErrors(updateEmail(userId, email));
  });
