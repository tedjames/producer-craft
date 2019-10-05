// Sweetalert Modals
import Swal from 'sweetalert2';
// React Router
import { browserHistory } from 'react-router';
// Firebase SDK
import { db } from '../database';
// Redux Action Types
import {
  CREATE_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
  FETCH_COURSES,
  FETCH_LESSONS,
  ADD_COURSE_MODAL,
  EDIT_COURSE_MODAL,
  SUCCESS,
  ERROR,
  PENDING,
} from './types';

export const createCourse = ({
  courseName,
  instructorName,
  price,
  productId,
  urlSlug,
  tagline,
  coverImage,
  trailerUrl,
  thumbnailImage,
  bioImage,
  bioTitle,
  bioDescription,
  readMoreUrl,
  twitterUrl,
  facebookUrl,
  redditUrl,
}) => {
  return dispatch => {
    dispatch({ type: CREATE_COURSE, payload: PENDING });
    //TODO: add form validation here
    db.collection('courses')
      // TODO: add UUID for generating unique course id's
      .doc('courseId')
      .set({
        courseName,
        instructorName,
        price,
        productId,
        urlSlug,
        tagline,
        coverImage,
        trailerUrl,
        thumbnailImage,
        bioImage,
        bioTitle,
        bioDescription,
        readMoreUrl,
        twitterUrl,
        facebookUrl,
        redditUrl,
      })
      .then(() => {
        console.log('Course created!');
        dispatch({ type: ADD_COURSE_MODAL, payload: false });
        dispatch({ type: CREATE_COURSE, payload: SUCCESS });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Course Created',
          text: 'Course successfully created and written to database.',
          type: 'success',
          confirmButtonText: 'Continue',
        });
      })
      .catch(err => {
        console.log('Error creating course: ', err);
        dispatch({ type: CREATE_COURSE, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to write course to database! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'Continue',
        });
      });
  };
};

export const updateCourse = ({
  courseName,
  instructorName,
  price,
  productId,
  urlSlug,
  tagline,
  coverImage,
  trailerUrl,
  thumbnailImage,
  bioImage,
  bioTitle,
  bioDescription,
  readMoreUrl,
  twitterUrl,
  facebookUrl,
  redditUrl,
}) => {
  return dispatch => {
    dispatch({ type: UPDATE_COURSE, payload: PENDING });
    //TODO: add form validation here
    db.collection('courses')
      // TODO: add UUID for genreating unique course id's
      .doc('courseId')
      .set(
        {
          courseName,
          instructorName,
          price,
          productId,
          urlSlug,
          tagline,
          coverImage,
          trailerUrl,
          thumbnailImage,
          bioImage,
          bioTitle,
          bioDescription,
          readMoreUrl,
          twitterUrl,
          facebookUrl,
          redditUrl,
        },
        { merge: true },
      )
      .then(() => {
        console.log('Course created!');
        dispatch({ type: EDIT_COURSE_MODAL, payload: false });
        dispatch({ type: UPDATE_COURSE, payload: SUCCESS });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Course Updated',
          text: 'Course data successfully updated!',
          type: 'success',
          confirmButtonText: 'Continue',
        });
      })
      .catch(err => {
        console.log('Error updating course: ', err);
        dispatch({ type: UPDATE_COURSE, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to write course to database! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'Continue',
        });
      });
  };
};

export const deleteCourse = ({ courseId }) => {
  return dispatch => {
    db.collection('courses')
      .doc(courseId)
      .delete()
      .then(() => {
        // handle delete user reference from db success
        console.log('Successfully deleted course from db!');
        dispatch({
          type: SNACKBAR,
          payload: { variant: 'success', message: 'Course deleted' },
        });
        dispatch({ type: EDIT_COURSE_MODAL, payload: false });
        dispatch({ type: DELETE_COURSE, payload: SUCCESS });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Course Deleted',
          text: 'This course has successfully been removed from the database!',
          type: 'success',
          confirmButtonText: 'Continue',
          timer: 8000,
        });
      })
      .catch(error => {
        // handle delete user reference from db error
        console.log('Error deleting course from database', error);
        dispatch({
          type: SNACKBAR,
          payload: { variant: 'error', message: 'Unable to delete course from database' },
        });
        dispatch({ type: DELETE_COURSE, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to delete course! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'OKAY',
        });
      });
  };
};
