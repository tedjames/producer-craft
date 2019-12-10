import {
  SNACKBAR,
  SUBSCRIBE_MODAL,
  PAYMENT_MODAL,
  PAYMENT_LOADING,
  ACCOUNT_MODAL,
  ADD_COURSE_MODAL,
  EDIT_COURSE_MODAL,
  ADD_LESSON_MODAL,
  EDIT_LESSON_MODAL,
  ADD_FILE_MODAL,
  EDIT_FILE_MODAL,
  COURSE_SELECTED,
  LESSON_SELECTED,
  FETCH_COMMENTS,
  // FETCH_FILES,
  // ERROR,
} from './types';
import { db } from '../database';

export const closeSnackbar = () => ({
  type: SNACKBAR,
  payload: false,
});

export const toggleSubscribeModal = payload => ({
  type: SUBSCRIBE_MODAL,
  payload,
});

export const togglePaymentModal = payload => ({
  type: PAYMENT_MODAL,
  payload: payload
    ? {
        amount: payload.amount,
        productId: payload.productId || '',
        productName: payload.productName || 'Error: A product has no name',
        subscription: payload.subscription ? 'plan_FW6JkaZ4V59Q1e' : false,
      }
    : false,
});

export const togglePaymentLoading = payload => {
  console.log('TOGGLING PAYMENT LOADING', payload);

  return {
    type: PAYMENT_LOADING,
    payload,
  };
};

export const toggleAccountModal = payload => {
  return {
    type: ACCOUNT_MODAL,
    payload,
  };
};

export const toggleAddCourseModal = payload => ({
  type: ADD_COURSE_MODAL,
  payload,
});

export const toggleEditCourseModal = payload => ({
  type: EDIT_COURSE_MODAL,
  payload,
});

export const toggleAddLessonModal = payload => ({
  type: ADD_LESSON_MODAL,
  payload,
});

export const toggleEditLessonModal = payload => ({
  type: EDIT_LESSON_MODAL,
  payload,
});

export const toggleAddFileModal = payload => ({
  type: ADD_FILE_MODAL,
  payload,
});

export const toggleEditFileModal = payload => ({
  type: EDIT_FILE_MODAL,
  payload,
});

export const setSelectedCourse = payload => ({
  type: COURSE_SELECTED,
  payload,
});

export const setSelectedLesson = payload => {
  return dispatch => {
    dispatch({ type: LESSON_SELECTED, payload });
    const { lessonId } = payload;
    console.log('Setting selected lesson: ', lessonId);

    db.collection('lessons')
      .doc(lessonId)
      .collection('comments')
      .orderBy('likeCount', 'desc')
      .get()
      .then(snapshot => {
        const comments = [];
        snapshot.forEach(doc => {
          comments.push(doc.data());
        });
        console.log('Fetched comments: ', comments);
        dispatch({ type: FETCH_COMMENTS, payload: comments });
      })
      .catch(err => {
        console.log('Error fetching comments', err);
      });
  };
};
