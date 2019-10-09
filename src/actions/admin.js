// Sweetalert Modals
import Swal from 'sweetalert2';
// React Router
import { browserHistory } from 'react-router';
// UUID for Generating Unique IDs
import uuidv4 from 'uuid/v4';
// Firebase SDK
import { db } from '../database';
// Redux Action Types
import {
  // API Request Status
  SUCCESS,
  ERROR,
  PENDING,
  // Course Management
  CREATE_COURSE,
  FETCH_COURSES,
  FETCH_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  ADD_COURSE_MODAL,
  EDIT_COURSE_MODAL,
  // Lesson Management
  CREATE_LESSON,
  FETCH_LESSONS,
  UPDATE_LESSON,
  DELETE_LESSON,
  ADD_LESSON_MODAL,
  EDIT_LESSON_MODAL,
  CLEAR_LESSONS,
  // File Management
  CREATE_FILE,
  FETCH_FILES,
  DELETE_FILE,
  UPDATE_FILE,
  ADD_FILE_MODAL,
  EDIT_FILE_MODAL,
  // Comment Management
  CREATE_COMMENT,
  FETCH_COMMENTS,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  // Comment Reply Management
  CREATE_COMMENT_REPLY,
  FETCH_COMMENT_REPLIES,
  UPDATE_COMMENT_REPLY,
  DELETE_COMMENT_REPLY,
  // Account Management
} from './types';

///////////////////////////
/* Public Actions */
///////////////////////////

export const fetchCourses = () => {
  return dispatch => {
    db.collection('courses')
      .orderBy('courseNumber')
      .get()
      .then(snapshot => {
        const courses = [];
        snapshot.forEach(doc => {
          courses.push(doc.data());
        });
        console.log('Fetched courses: ', courses);
        dispatch({ type: FETCH_COURSES, payload: courses });
      })
      .catch(err => {
        console.log('Error fetching courses', err);
      });
  };
};

export const fetchCourseBySlug = ({ urlSlug }) => {
  return dispatch => {
    dispatch({ type: FETCH_COURSE, payload: PENDING });
    db.collection('courses')
      .where('urlSlug', '==', `${urlSlug}`)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log('Fetched course successfully: ', doc.data());
          dispatch({ type: FETCH_COURSE, payload: doc.data() });
        });
      })
      .catch(err => {
        console.log('Unable to fetch course: ', err);
        dispatch({ type: FETCH_COURSE, payload: ERROR });
      });
  };
};

export const fetchLessons = ({ courseId }) => {
  return dispatch => {
    console.log('Fetch lessons fired with ID: ', courseId);

    db.collection('lessons')
      .where('courseId', '==', `${courseId}`)
      .orderBy('lessonNumber')
      .get()
      .then(snapshot => {
        const lessons = [];
        snapshot.forEach(doc => {
          lessons.push(doc.data());
        });
        console.log('Fetched lessons: ', lessons);
        dispatch({ type: FETCH_LESSONS, payload: lessons });
      })
      .catch(err => {
        console.log('Error fetching lessons', err);
      });
  };
};

export const clearLessons = () => ({
  type: CLEAR_LESSONS,
  payload: null,
});

export const fetchFiles = ({ courseId, lessonId }) => {
  return dispatch => {
    db.collection('courses')
      .doc(courseId)
      .collection('lessons')
      .doc(lessonId)
      .collection('files')
      .get()
      .then(snapshot => {
        const files = [];
        snapshot.forEach(doc => {
          console.log(doc.data());
          files.push(doc.data());
        });
        console.log('Fetched files: ', files);
        dispatch({ type: FETCH_FILES, payload: files });
      })
      .catch(err => {
        console.log('Error fetching lessons', err);
      });
  };
};

export const fetchComments = ({ courseId, lessonId }) => {
  return dispatch => {
    db.collection('courses')
      .doc(courseId)
      .collection('lessons')
      .doc(lessonId)
      .collection('comments')
      .get()
      .then(snapshot => {
        const comments = [];
        snapshot.forEach(doc => {
          console.log(doc.data());
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

///////////////////////////
/* Authenticated Actions */
///////////////////////////

///////////////////////////
/* Admin Actions */
///////////////////////////

// Course Management Actions
export const createCourse = ({
  courseName,
  courseNumber,
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
  valuePropTitle,
  valuePropTitle2,
  valuePropTitle3,
  valuePropDescription,
  valuePropDescription2,
  valuePropDescription3,
}) => {
  return dispatch => {
    dispatch({ type: CREATE_COURSE, payload: PENDING });
    //TODO: add form validation here
    const courseId = uuidv4();
    db.collection('courses')
      .doc(courseId)
      .set({
        courseId,
        courseName,
        courseNumber,
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
        valuePropTitle,
        valuePropTitle2,
        valuePropTitle3,
        valuePropDescription,
        valuePropDescription2,
        valuePropDescription3,
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
  courseId,
  courseName,
  courseNumber,
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
  valuePropTitle,
  valuePropTitle2,
  valuePropTitle3,
  valuePropDescription,
  valuePropDescription2,
  valuePropDescription3,
}) => {
  return dispatch => {
    dispatch({ type: UPDATE_COURSE, payload: PENDING });
    //TODO: add form validation here
    db.collection('courses')
      // TODO: add UUID for genreating unique course id's
      .doc(courseId)
      .set(
        {
          courseName,
          courseNumber,
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
          valuePropTitle,
          valuePropTitle2,
          valuePropTitle3,
          valuePropDescription,
          valuePropDescription2,
          valuePropDescription3,
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

// Lesson Management Actions
export const createLesson = ({
  courseId,
  lessonName,
  lessonNumber,
  description,
  mediaId,
  thumbnailImage,
  trailerImage,
}) => {
  return dispatch => {
    dispatch({ type: CREATE_LESSON, payload: PENDING });
    //TODO: add form validation here
    const lessonId = uuidv4();
    db.collection('lessons')
      .doc(lessonId)
      .set({
        courseId,
        lessonId,
        lessonName,
        lessonNumber,
        description,
        mediaId,
        thumbnailImage,
        trailerImage,
      })
      .then(() => {
        console.log('Lesson created!');
        dispatch({ type: ADD_LESSON_MODAL, payload: false });
        dispatch({ type: CREATE_LESSON, payload: SUCCESS });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Lesson Created',
          text: 'Lesson successfully created and written to database.',
          type: 'success',
          confirmButtonText: 'Continue',
        });
      })
      .catch(err => {
        console.log('Error creating lesson: ', err);
        dispatch({ type: CREATE_LESSON, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to write lesson to database! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'Continue',
        });
      });
  };
};

export const updateLesson = ({
  lessonId,
  lessonName,
  lessonNumber,
  description,
  mediaId,
  thumbnailImage,
  trailerImage,
}) => {
  return dispatch => {
    dispatch({ type: UPDATE_LESSON, payload: PENDING });
    //TODO: add form validation here
    db.collection('lessons')
      .doc(lessonId)
      .set(
        {
          lessonName,
          lessonNumber,
          description,
          mediaId,
          thumbnailImage,
          trailerImage,
        },
        { merge: true },
      )
      .then(() => {
        console.log('Lesson updated!');
        dispatch({ type: EDIT_LESSON_MODAL, payload: false });
        dispatch({ type: UPDATE_LESSON, payload: SUCCESS });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Lesson Updated',
          text: 'Lesson data successfully updated!',
          type: 'success',
          confirmButtonText: 'Continue',
        });
      })
      .catch(err => {
        console.log('Error updating lesson: ', err);
        dispatch({ type: UPDATE_LESSON, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to write lesson to database! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'Continue',
        });
      });
  };
};

export const deleteLesson = ({ lessonId }) => {
  return dispatch => {
    db.collection('lessons')
      .doc(lessonId)
      .delete()
      .then(() => {
        // handle delete user reference from db success
        console.log('Successfully deleted lesson from db!');
        dispatch({ type: EDIT_LESSON_MODAL, payload: false });
        dispatch({ type: DELETE_LESSON, payload: SUCCESS });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Lesson Deleted',
          text: 'This lesson has successfully been removed from the database!',
          type: 'success',
          confirmButtonText: 'Continue',
          timer: 8000,
        });
      })
      .catch(error => {
        // handle delete user reference from db error
        console.log('Error deleting lesson from database', error);
        dispatch({ type: DELETE_LESSON, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to delete lesson! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'OKAY',
        });
      });
  };
};

// File Management Actions
export const createFile = ({ fileName, lessonId, fileUrl }) => {
  return dispatch => {
    dispatch({ type: CREATE_FILE, payload: PENDING });
    //TODO: add form validation here
    const fileId = uuidv4();
    db.collection('lessons')
      .doc(lessonId)
      .collection('files')
      .doc(fileId)
      .set({
        fileName,
        lessonId,
        fileUrl,
      })
      .then(() => {
        console.log('File created!');
        dispatch({ type: ADD_FILE_MODAL, payload: false });
        dispatch({ type: CREATE_FILE, payload: SUCCESS });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'File Created',
          text: 'File successfully created and written to database.',
          type: 'success',
          confirmButtonText: 'Continue',
        });
      })
      .catch(err => {
        console.log('Error creating file: ', err);
        dispatch({ type: CREATE_FILE, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to write file to database! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'Continue',
        });
      });
  };
};

export const updateFile = ({ fileId, fileName, lessonId, fileUrl }) => {
  return dispatch => {
    dispatch({ type: UPDATE_FILE, payload: PENDING });
    //TODO: add form validation here
    db.collection('files')
      .doc(fileId)
      .set(
        {
          fileName,
          lessonId,
          fileUrl,
        },
        { merge: true },
      )
      .then(() => {
        console.log('File updated!');
        dispatch({ type: EDIT_FILE_MODAL, payload: false });
        dispatch({ type: UPDATE_FILE, payload: SUCCESS });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'File Updated',
          text: 'File data successfully updated!',
          type: 'success',
          confirmButtonText: 'Continue',
        });
      })
      .catch(err => {
        console.log('Error updating file: ', err);
        dispatch({ type: UPDATE_FILE, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to write file to database! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'Continue',
        });
      });
  };
};

export const deleteFile = ({ fileId }) => {
  return dispatch => {
    db.collection('files')
      .doc(fileId)
      .delete()
      .then(() => {
        // handle delete user reference from db success
        console.log('Successfully deleted file from db!');
        dispatch({ type: EDIT_FILE_MODAL, payload: false });
        dispatch({ type: DELETE_FILE, payload: SUCCESS });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'File Deleted',
          text: 'This file has successfully been removed from the database!',
          type: 'success',
          confirmButtonText: 'Continue',
          timer: 8000,
        });
      })
      .catch(error => {
        // handle delete user reference from db error
        console.log('Error deleting file from database', error);
        dispatch({ type: DELETE_FILE, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to delete file! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'OKAY',
        });
      });
  };
};

// Comment Management Actions
export const createComment = ({ lessonId, message, userId }) => {
  return dispatch => {
    dispatch({ type: CREATE_COMMENT, payload: PENDING });
    //TODO: add form validation here
    const commentId = uuidv4();
    db.collection('lessons')
      .doc(lessonId)
      .collection('comments')
      .doc(commentId)
      .set({
        lessonId,
        commentId,
        userId,
        message,
      })
      .then(() => {
        console.log('Comment created!');
        dispatch({ type: CREATE_COMMENT, payload: message });
      })
      .catch(err => {
        console.log('Error creating comment: ', err);
        dispatch({ type: CREATE_COMMENT, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to write comment to database! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'Continue',
        });
      });
  };
};

export const updateComment = ({ commentId, message, lessonId }) => {
  return dispatch => {
    dispatch({ type: UPDATE_COMMENT, payload: PENDING });
    //TODO: add form validation here
    db.collection('lessons')
      .doc(lessonId)
      .collection('comments')
      .doc(commentId)
      .set(
        {
          message,
        },
        { merge: true },
      )
      .then(() => {
        console.log('Comment updated!');
        dispatch({ type: UPDATE_COMMENT, payload: SUCCESS });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Comment Updated',
          text: 'Comment successfully updated!',
          type: 'success',
          confirmButtonText: 'Continue',
        });
      })
      .catch(err => {
        console.log('Error updating comment: ', err);
        dispatch({ type: UPDATE_COMMENT, payload: ERROR });
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Internal Error',
          text: 'Unable to update this comment! Check console for error logging.',
          type: 'error',
          confirmButtonText: 'Continue',
        });
      });
  };
};

export const deleteComment = ({ lessonId, commentId }) => {
  return dispatch => {
    db.collection('lessons')
      .doc(lessonId)
      .collection('comments')
      .doc(commentId)
      .delete()
      .then(() => {
        // handle delete user reference from db success
        console.log('Successfully deleted comment from db!');
        dispatch({ type: DELETE_COMMENT, payload: SUCCESS });
      })
      .catch(error => {
        // handle delete user reference from db error
        console.log('Error deleting comment from database', error);
        dispatch({ type: DELETE_COMMENT, payload: ERROR });
      });
  };
};

// Comment Reply Management Actions
export const createCommentReply = ({ lessonId, message, userId, commentId }) => {
  return dispatch => {
    dispatch({ type: CREATE_COMMENT_REPLY, payload: PENDING });
    //TODO: add form validation here
    const commentReplyId = uuidv4();
    db.collection('lessons')
      .doc(lessonId)
      .collection('comments')
      .doc(commentId)
      .collection('replies')
      .doc(commentReplyId)
      .set({
        lessonId,
        commentId,
        commentReplyId,
        userId,
        message,
      })
      .then(() => {
        console.log('Comment reply created!');
        dispatch({ type: CREATE_COMMENT_REPLY, payload: message });
      })
      .catch(err => {
        console.log('Error creating comment reply: ', err);
        dispatch({ type: CREATE_COMMENT_REPLY, payload: ERROR });
      });
  };
};

export const updateCommentReply = ({ commentId, message, lessonId, commentReplyId }) => {
  return dispatch => {
    dispatch({ type: UPDATE_COMMENT, payload: PENDING });
    //TODO: add form validation here
    db.collection('lessons')
      .doc(lessonId)
      .collection('comments')
      .doc(commentId)
      .collection('replies')
      .doc(commentReplyId)
      .set(
        {
          message,
        },
        { merge: true },
      )
      .then(() => {
        console.log('Comment reply updated!');
        dispatch({ type: UPDATE_COMMENT_REPLY, payload: SUCCESS });
      })
      .catch(err => {
        console.log('Error updating comment reply: ', err);
        dispatch({ type: UPDATE_COMMENT_REPLY, payload: ERROR });
      });
  };
};

export const deleteCommentReply = ({ lessonId, commentId, commentReplyId }) => {
  return dispatch => {
    db.collection('lessons')
      .doc(lessonId)
      .collection('comments')
      .doc(commentId)
      .collection('replies')
      .doc(commentReplyId)
      .delete()
      .then(() => {
        console.log('Successfully deleted comment reply from db!');
        dispatch({ type: DELETE_COMMENT_REPLY, payload: SUCCESS });
      })
      .catch(error => {
        console.log('Error deleting comment from database: ', error);
        dispatch({ type: DELETE_COMMENT_REPLY, payload: ERROR });
      });
  };
};
