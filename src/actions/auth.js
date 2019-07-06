// Firebase SDK
import { auth, database } from 'firebase';
// Redux Action Types
import {
  PENDING,
  ERROR,
  SUCCESS,
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  COMPANY_CHANGED,
  POSITION_CHANGED,
  CLEAR_AUTH_FORM,
  AUTH_ERROR,
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  RESET_PASSWORD,
  UPDATE_EMAIL,
  REQUEST_ACCOUNT,
  REGISTER_MODAL,
  SNACKBAR,
  FORGOT_PASSWORD_MODAL,
} from './types';

// ////////////////////////////////////////////////////////////////////
/*  Helper Functions  */

// used to generate randomized seed
const generateSeed = () => {
  const length = 32;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
  const randomValues = new Uint32Array(length);
  const result = new Array(length);

  window.crypto.getRandomValues(randomValues);

  let cursor = 0;
  for (let i = 0; i < randomValues.length; i++) {
    cursor += randomValues[i];
    result[i] = chars[cursor % chars.length];
  }
  return result.join('');
};
// universal auth form error handler
export const authError = error => ({
  type: AUTH_ERROR,
  payload: error,
});

// ////////////////////////////////////////////////////////////////////
/*  Login + Registration Actions  */

// log in user w/ email and password + self-destruct account if not found in db
export const loginUser = (email, password) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER, payload: PENDING });

    // log in user to firebase w/ email and password
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        // handle login success
        console.log('Successfully logged in: ', user);
        dispatch({ type: CLEAR_AUTH_FORM });
        const { currentUser } = auth();
        database()
          .ref(`/users/${currentUser.uid}`)
          .once('value', snapshot => {
            // delete user if not found in db
            if (snapshot.val() === null) {
              console.log('USER NOT FOUND IN DATABASE - SELF-DESTRUCTING NOW... ');
              currentUser
                .delete()
                .then(() => {
                  console.log('User deleted');
                  dispatch({ type: LOGIN_USER, payload: ERROR });
                })
                .catch(() => {
                  console.log('Error deleting user');
                  dispatch({ type: LOGIN_USER, payload: ERROR });
                });
            }
          });
      })
      .catch(error => {
        // handle login error
        console.log('Error logging in: ', error);
        dispatch({ type: CLEAR_AUTH_FORM });
        dispatch({ type: LOGIN_USER, payload: ERROR });
      });
  };
};
// log out current user
export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: LOGOUT_USER, payload: PENDING });

    // signout user from firebase
    auth()
      .signOut()
      .then(user => {
        // handle logout success
        console.log('Successfully logged user out: ', user);
        dispatch({ type: LOGOUT_USER, payload: SUCCESS });
      })
      .catch(error => {
        // handle logout error
        console.log('Error logging out: ', error);
        dispatch({ type: LOGOUT_USER, payload: ERROR });
      });
  };
};
// login + registration form
export const nameChanged = text => ({
  type: NAME_CHANGED,
  payload: text,
});
export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text,
});
export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text,
});
export const companyChanged = text => ({
  type: COMPANY_CHANGED,
  payload: text,
});
export const positionChanged = text => ({
  type: POSITION_CHANGED,
  payload: text,
});
export const clearAuthForm = () => ({
  type: CLEAR_AUTH_FORM,
});

// request account
export const requestAccount = ({ name, email, company, position }) => {
  return dispatch => {
    dispatch({ type: REQUEST_ACCOUNT, payload: PENDING });
    const rid = generateSeed();

    // add registration to db
    database()
      .ref(`/registrations/${rid}`)
      .set({ rid, name, email, company, position })
      .then(() => {
        // handle registration success
        console.log('Registration successful!');
        dispatch({ type: REGISTER_MODAL, payload: false });
        dispatch({ type: SNACKBAR, payload: 'Account request submitted' });
        dispatch({ type: REQUEST_ACCOUNT, payload: SUCCESS });
      })
      .catch(error => {
        // handle registration error
        console.log('Error writing registration to db: ', error);
        dispatch({ type: REQUEST_ACCOUNT, payload: ERROR });
      });
  };
};

// ////////////////////////////////////////////////////////////////////
/*  Authentication Session Handling  */

export const pendingAuthentication = () => {
  return { type: AUTH_USER, payload: PENDING };
};
export const authenticate = authUser => {
  return dispatch => {
    database()
      .ref(`/users/${authUser.uid}`)
      .once('value', snapshot => {
        // if email doesn't match DB, update DB ref to match it
        if (snapshot.val().email !== authUser.email) {
          database()
            .ref(`/users/${authUser.uid}`)
            .update({ email: authUser.email })
            .then(() => {
              console.log('Email successfully updated in DB!');
              dispatch({ type: UPDATE_EMAIL, payload: SUCCESS });
              dispatch({ type: AUTH_USER, payload: authUser });
            })
            .catch(error => {
              console.log('Error- Unable to update email in DB', error);
              dispatch({ type: UPDATE_EMAIL, payload: ERROR });
              dispatch({ type: AUTH_USER, payload: authUser });
            });
        }
        dispatch({ type: AUTH_USER, payload: authUser });
      });
  };
};
export const unauthenticate = () => {
  return { type: AUTH_USER, payload: ERROR };
};

// ////////////////////////////////////////////////////////////////////
/*  Personal Account Management  */

// send password reset email
export const resetPassword = email => {
  console.log('PASSWORD RESET ENGAGED');
  return dispatch => {
    dispatch({ type: RESET_PASSWORD, payload: PENDING });
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent!');
        dispatch({ type: FORGOT_PASSWORD_MODAL, payload: false });
        dispatch({ type: RESET_PASSWORD, payload: SUCCESS });
      })
      .catch(() => {
        console.log('ERROR: Password reset email unable to be sent...');
        dispatch({ type: RESET_PASSWORD, payload: ERROR });
      });
  };
};
// update email for currently logged in user
export const updateEmail = email => {
  return dispatch => {
    dispatch({ type: UPDATE_EMAIL, payload: PENDING });
    const { uid } = auth().currentUser;
    auth()
      .currentUser.updateEmail(email)
      .then(() => {
        console.log('Email successfully changed! Updating ref in db...');
        database()
          .ref(`/users/${uid}`)
          .update({ email })
          .then(() => {
            console.log('Email successfully updated in DB!');
            dispatch({ type: UPDATE_EMAIL, payload: SUCCESS });
          })
          .catch(error => {
            console.log('Error- Unable to update email in DB', error);
            dispatch({ type: UPDATE_EMAIL, payload: ERROR });
          });
      })
      .catch(error => {
        console.log('ERROR - Unable to update email: ', error);
      });
  };
};
