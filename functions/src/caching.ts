// Sets lastUpdated variable for data stores including comments, comment replies, lessons, courses, and files
// lastUpdated variables are read on the client to determine if local redux stores should rehydrate
// fetch requests are cached in localStorage or indexedDB on the client side as: { lastUpdated: '0972409174', comments: [...]}
// if lastUpdated on server is more recent than lastUpdated in the local cache or if local cache does not exist...
// ... rehydrate/re-fetch data from firestore

// TODO: create cache event handlers that store lastUpdated dates when new data is writter (created, updated or deleted)
// TODO: indexedDB vs localstorage & other options?
// TODO: Add rehydration functions within redux actions to avoid firebase calls within components
// TODO: test this on multiple devices

import * as functions from 'firebase-functions';
import { db } from './config';
import { catchErrors } from './helpers';

////////////////////////////////////////////////
/*  COURSES CACHING  */
////////////////////////////////////////////////

const courseCache = async (courseId: any) => {
  // Initialize transaction
  const batch = db.batch();
  // Create db reference for courses cache object
  const courseCacheRef = db.collection('cacheTimestamps').doc('courses');
  // Update lastModified in "cacheTimestamps/courses" object
  batch.set(
    courseCacheRef,
    {
      lastModified: Date.now(),
    },
    { merge: true },
  );
  // Commit transaction
  await batch.commit();
};

// COMMENT EVENT HANDLER
export const handleCourseCache = functions.firestore
  .document('courses/{courseId}')
  .onWrite(async (snap, context) => {
    const { courseId } = context.params;
    console.log('CACHING COURSE WITH ID: ', courseId);

    return catchErrors(courseCache(courseId));
  });

////////////////////////////////////////////////
/*  LESSON CACHING  */
////////////////////////////////////////////////

const lessonCache: any = async (courseId: any) => {
  // Initialize transaction
  const batch = db.batch();
  // Create db reference for course object
  const courseRef = db.collection('courses').doc(courseId);
  // Update lessonsLastModified in course object
  batch.set(
    courseRef,
    {
      lessonsLastModified: Date.now(),
    },
    { merge: true },
  );
  // Commit transaction
  await batch.commit();
};

// LESSON EVENT HANDLER
export const handleDeleteLessonCache = functions.firestore
  .document('lessons/{lessonId}')
  .onDelete(async snap => {
    // Use snap.before for handling deleted lessons
    console.log('Snapshot received. Fetching courseId from data...');

    const { courseId } = snap.data();
    console.log('Fetched courseId: ', courseId);

    return catchErrors(lessonCache(courseId));
  });

export const handleCreateLessonCache = functions.firestore
  .document('lessons/{lessonId}')
  .onCreate(async snap => {
    // Use snap.before for handling deleted lessons
    console.log('Snapshot received. Fetching courseId from data...');
    const { courseId } = snap.data();
    console.log('Fetched courseId: ', courseId);
    return catchErrors(lessonCache(courseId));
  });

export const handleUpdateLessonCache = functions.firestore
  .document('lessons/{lessonId}')
  .onUpdate(async snap => {
    // Use snap.before for handling deleted lessons
    const courseId = snap.after.data().courseId;
    return catchErrors(lessonCache(courseId));
  });

////////////////////////////////////////////////
/*  COMMENTS CACHING  */
////////////////////////////////////////////////

const commentCache = async (lessonId: any) => {
  // Initialize transaction
  const batch = db.batch();
  // Create db reference for lesson object
  const lessonRef = db.collection('lessons').doc(lessonId);
  // Update commentsLastUpdated in lesson object
  batch.set(
    lessonRef,
    {
      commentsLastModified: Date.now(),
    },
    { merge: true },
  );
  // Commit transaction
  await batch.commit();
};

// COMMENT EVENT HANDLER
export const handleCommentCache = functions.firestore
  .document('lessons/{lessonId}/comments/{commentId}')
  .onWrite(async (snap, context) => {
    const { lessonId } = context.params;
    return catchErrors(commentCache(lessonId));
  });

////////////////////////////////////////////////
/*  COMMENT REPLY CACHING  */
////////////////////////////////////////////////

const commentReplyCache = async (lessonId: any, commentId: any) => {
  // Initialize transaction
  const batch = db.batch();
  // Create db reference for comment object
  const commentRef = db
    .collection('lessons')
    .doc(lessonId)
    .collection('comments')
    .doc(commentId);
  // Update repliesLastUpdated in comment object
  batch.set(
    commentRef,
    {
      repliesLastModified: Date.now(),
    },
    { merge: true },
  );
  // Commit transaction
  await batch.commit();
};

// COMMENT REPLY EVENT HANDLER
export const handleCommentReplyCache = functions.firestore
  .document('lessons/{lessonId}/comments/{commentId}/replies/{replyId}')
  .onWrite(async (snap, context) => {
    const { lessonId, commentId } = context.params;
    return catchErrors(commentReplyCache(lessonId, commentId));
  });
