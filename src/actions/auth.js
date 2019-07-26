// Firebase SDK
import { auth } from 'firebase';
import { db } from '../database';
// Redux Action Types
import {
  PENDING,
  ERROR,
  SUCCESS,
  USERNAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  CLEAR_AUTH_FORM,
  AUTH_ERROR,
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  RESET_PASSWORD,
  SNACKBAR,
  FORGOT_PASSWORD_MODAL,
  GET_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  AUTH_MODAL,
  REGISTRATION_MODAL,
  LOGIN_MODAL,
} from './types';

// Snackbar

// ////////////////////////////////////////////////////////////////////
/*  Helper Functions  */

// universal auth form error handler
export const authError = ({ error }) => ({
  type: AUTH_ERROR,
  payload: error,
});

// hide and show auth modal
export const showAuthModal = payload => ({
  type: AUTH_MODAL,
  payload,
});

// show registration modal
export const showRegistrationModal = payload => ({
  type: REGISTRATION_MODAL,
  payload,
});

export const showLoginModal = payload => ({
  type: LOGIN_MODAL,
  payload,
});

// ////////////////////////////////////////////////////////////////////
/*  Login + Registration Actions  */

// log in user w/ email and password + self-destruct account if not found in db
export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER, payload: PENDING });

    // log in user to firebase w/ email and password
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        // handle login success
        console.log('Successfully logged in: ', user);
        dispatch({ type: CLEAR_AUTH_FORM });
        dispatch({
          type: SNACKBAR,
          payload: { variant: 'success', message: 'Successfully logged in' },
        });
        dispatch({ type: LOGIN_USER, payload: user });
      })
      .catch(error => {
        // handle login error
        console.log('Error logging in: ', error);
        dispatch({ type: AUTH_ERROR, payload: error.message });
        dispatch({
          type: SNACKBAR,
          payload: { variant: 'error', message: error.message },
        });
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
        dispatch({
          type: SNACKBAR,
          payload: { variant: 'success', message: 'Successfully logged out' },
        });
        dispatch({ type: LOGOUT_USER, payload: SUCCESS });
      })
      .catch(error => {
        // handle logout error
        console.log('Error logging out: ', error);
        dispatch({
          type: SNACKBAR,
          payload: { variant: 'error', message: 'Unable to log out. Please try again.' },
        });
        dispatch({ type: LOGOUT_USER, payload: ERROR });
      });
  };
};
// login + registration form
export const usernameChanged = text => ({
  type: USERNAME_CHANGED,
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
export const confirmPasswordChanged = text => ({
  type: CONFIRM_PASSWORD_CHANGED,
  payload: text,
});
export const clearAuthForm = payload => ({
  type: CLEAR_AUTH_FORM,
  payload,
});

// ////////////////////////////////////////////////////////////////////
/*  Authentication Session Handling  */

export const pendingAuthentication = () => {
  return { type: AUTH_USER, payload: PENDING };
};
export const authenticate = authUser => {
  return dispatch => {
    // TODO: check if authUser.email matches email found in db user document
    dispatch({ type: AUTH_USER, payload: authUser });
  };
};
export const unauthenticate = () => {
  return { type: AUTH_USER, payload: ERROR };
};

// ////////////////////////////////////////////////////////////////////
/*  Personal Account Management  */

// send password reset email
export const resetPassword = ({ email }) => {
  console.log('PASSWORD RESET ENGAGED');
  return dispatch => {
    dispatch({ type: RESET_PASSWORD, payload: PENDING });
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent!');
        dispatch({ type: FORGOT_PASSWORD_MODAL, payload: false });
        dispatch({
          type: SNACKBAR,
          payload: {
            variant: 'success',
            message: 'Password recovery email sent! Please check your email.',
          },
        });
        dispatch({ type: RESET_PASSWORD, payload: SUCCESS });
      })
      .catch(error => {
        console.log('ERROR: Password reset email unable to be sent...', error);
        dispatch({
          type: SNACKBAR,
          payload: { variant: 'error', message: error.message },
        });
        dispatch({ type: RESET_PASSWORD, payload: ERROR });
      });
  };
};

//////////////////////////////////////////////////////////////////////
/*  User Account Management  */

// get user
export const getUser = () => {
  return dispatch => {
    const user = auth().currentUser;
    dispatch({ type: GET_USER, payload: PENDING });

    // listen to users object from db
    db.collection('users')
      .doc(user.uid)
      .onSnapshot(doc => {
        // handle listen to users success
        console.log('Successfully retrieved user!', doc.val());
        dispatch({ type: GET_USER, payload: doc.val() });
      });
  };
};
// create new user
export const createUser = ({ username, email, password }) => {
  return dispatch => {
    dispatch({ type: CREATE_USER, payload: PENDING });

    // TODO: Preserve subscription + purchase data after creating a new account
    // Check db to see if email exists in users doc
    // If email exists, make new user doc
    // Copy private sub-collection from old user doc to new user doc
    // Then delete the old user doc so that...
    // Users can keep their subscriptions and purchases after deleting their account

    // create new user w/ new firebase instance - requires name, email, and password
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userRecord => {
        console.log('Account successfully created:', userRecord);
        const { uid } = userRecord.user;

        // Add reference to user in db
        db.collection('users')
          .doc(uid)
          .set({ uid, username, email, roles: ['student'] })
          .then(() => {
            auth()
              // update display name to show in confirmation email
              .currentUser.updateProfile({
                displayName: username,
              })
              .then(() => {
                auth()
                  .currentUser.sendEmailVerification()
                  .then(() => {
                    console.log('Verification email sent!');
                    dispatch({ type: AUTH_MODAL, payload: false });
                    dispatch({
                      type: SNACKBAR,
                      payload: { variant: 'success', message: 'Verification email sent' },
                    });
                    dispatch({ type: CREATE_USER, payload: SUCCESS });
                  })
                  .catch(error => {
                    console.log('Error sending verification email: ', error);
                    dispatch({
                      type: SNACKBAR,
                      payload: { variant: 'error', message: 'Unable to send verification email' },
                    });
                    dispatch({ type: CREATE_USER, payload: ERROR });
                  });
              })
              .catch(error => {
                console.log('Error assigning display name: ', error);
                dispatch({
                  type: SNACKBAR,
                  payload: { variant: 'error', message: 'Unable to assign display name' },
                });
                dispatch({ type: CREATE_USER, payload: ERROR });
              });
            // send verification email to user
          })
          .catch(error => {
            // handle adding db document error
            console.log('Error adding document to users collection: ', error);
            dispatch({
              type: SNACKBAR,
              payload: { variant: 'error', message: 'Unable to create user' },
            });
            dispatch({ type: CREATE_USER, payload: ERROR });
          });
      })
      .catch(error => {
        // handle error creating user w/ admin API
        console.log('Error creating new user: ', error);
        dispatch({ type: AUTH_ERROR, payload: error.message });
        dispatch({
          type: SNACKBAR,
          payload: { variant: 'error', message: 'Unable to create user' },
        });
        dispatch({ type: CREATE_USER, payload: ERROR });
      });
  };
};
// update existing user - provide null object to remove entries
export const updateUser = ({ firstName, lastName, email, password }) => {
  return dispatch => {
    const user = auth().currentUser;
    dispatch({ type: UPDATE_USER, payload: PENDING });

    // update user reference in db
    user
      .reauthenticateWithCredential(password)
      .then(() => {
        console.log('User successfully re-authenticated');
        // check if their email has changed
        if (user.email !== email) {
          user
            .updateEmail(email)
            .then(() => {
              console.log('Updated email in firebase');
              // update email, firstName and lastName in db
              db.collection('users')
                .doc(user.uid)
                .update({ firstName, lastName, email })
                .then(() => {
                  // handle adding user reference to db success
                  console.log('User reference successfully updated in db!');
                  dispatch({ type: AUTH_MODAL, payload: false });
                  dispatch({
                    type: SNACKBAR,
                    payload: { variant: 'success', message: 'Account updated' },
                  });
                  dispatch({ type: UPDATE_USER, payload: SUCCESS });
                })
                .catch(error => {
                  // handle adding user reference to db error
                  console.log('Error updating reference to user in db: ', error);
                  dispatch({
                    type: SNACKBAR,
                    payload: { variant: 'error', message: 'Unable to update user' },
                  });
                  dispatch({ type: UPDATE_USER, payload: ERROR });
                });
            })
            .catch(error => {
              console.log('Error updating email in firebase: ', error);
              dispatch({ type: UPDATE_USER, payload: ERROR });
            });
        } else {
          // Update firstName and lastName only in db
          db.collection('users')
            .doc(user.uid)
            .update({ firstName, lastName })
            .then(() => {
              // handle adding user reference to db success
              console.log('User reference successfully updated in db!');
              dispatch({ type: AUTH_MODAL, payload: false });
              dispatch({
                type: SNACKBAR,
                payload: { variant: 'success', message: 'Account updated' },
              });
              dispatch({ type: UPDATE_USER, payload: SUCCESS });
            })
            .catch(error => {
              // handle adding user reference to db error
              console.log('Error updating reference to user in db: ', error);
              dispatch({
                type: SNACKBAR,
                payload: { variant: 'error', message: 'Unable to update user' },
              });
              dispatch({ type: UPDATE_USER, payload: ERROR });
            });
        }
      })
      .catch(error => {
        console.log('Error re-authenticating user: ', error);
      });
  };
};
// delete user by uid
export const deleteUser = ({ password }) => {
  return dispatch => {
    const user = auth().currentUser;
    dispatch({ type: DELETE_USER, payload: PENDING });
    user
      .reauthenticateWithCredential(password)
      .then(() => {
        console.log('User successfully re-authenticated');
        user
          .delete()
          .then(() => {
            db.collection('users')
              .doc(user.uid)
              .set({ disabled: true })
              .then(() => {
                // handle delete user reference from db success
                console.log('Successfully deleted user from db!');
                dispatch({
                  type: SNACKBAR,
                  payload: { variant: 'success', message: 'Account deleted' },
                });
                dispatch({ type: AUTH_MODAL, payload: false });
                dispatch({ type: DELETE_USER, payload: SUCCESS });
              })
              .catch(error => {
                // handle delete user reference from db error
                console.log('Error deleting user reference from db', error);
                dispatch({
                  type: SNACKBAR,
                  payload: { variant: 'error', message: 'Unable to delete user from database' },
                });
                dispatch({ type: DELETE_USER, payload: ERROR });
              });
          })
          .catch(error => {
            console.log('Error deleting user: ', error);
            dispatch({
              type: SNACKBAR,
              payload: { variant: 'error', message: 'Unable to delete account' },
            });
            dispatch({ type: DELETE_USER, payload: ERROR });
          });
      })
      .catch(error => {
        dispatch({
          type: SNACKBAR,
          payload: { variant: 'error', message: 'Unable to reauthenticate' },
        });
        console.log('Error re-authenticating user: ', error);
      });
  };
};
