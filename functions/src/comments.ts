import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import client from 'firebase-tools';
import { db } from './config';
import { catchErrors } from './helpers';

const updateLikeCount = async (lessonId: any, commentId: any, value: any) => {
  const liked = value > 0;
  const batch = db.batch();

  const commentRef = db
    .collection('lessons')
    .doc(lessonId)
    .collection('comments')
    .doc(commentId);
  batch.set(
    commentRef,
    {
      likeCount: liked
        ? admin.firestore.FieldValue.increment(1)
        : admin.firestore.FieldValue.increment(-1),
    },
    { merge: true },
  );
  await batch.commit();
};

const incrementReplyCount = async (lessonId: any, commentId: any) => {
  const batch = db.batch();

  const commentRef = db
    .collection('lessons')
    .doc(lessonId)
    .collection('comments')
    .doc(commentId);
  batch.set(
    commentRef,
    {
      replyCount: admin.firestore.FieldValue.increment(1),
    },
    { merge: true },
  );
  await batch.commit();
};

const decrementReplyCount = async (lessonId: any, commentId: any) => {
  const batch = db.batch();

  const commentRef = db
    .collection('lessons')
    .doc(lessonId)
    .collection('comments')
    .doc(commentId);
  batch.set(
    commentRef,
    {
      replyCount: admin.firestore.FieldValue.increment(-1),
    },
    { merge: true },
  );
  await batch.commit();
};

export const likeComment = functions.firestore
  .document('lessons/{lessonId}/comments/{commentId}/likes/{likeId}')
  .onWrite(async (snap, context) => {
    const { lessonId, commentId } = context.params;
    const { value } = snap.after.data();
    console.log('Like Detected! ', 'LID: ', lessonId, 'CID: ', commentId, 'Value: ', value);

    return catchErrors(updateLikeCount(lessonId, commentId, value));
  });

//////////////////////////////////////////////////////
/** Incrementing & Decrementing Reply Count */
//////////////////////////////////////////////////////

export const handleCreateCommentReply = functions.firestore
  .document('lessons/{lessonId}/comments/{commentId}/replies/{replyId}')
  .onCreate(async (snap, context) => {
    const { lessonId, commentId } = context.params;

    return catchErrors(incrementReplyCount(lessonId, commentId));
  });

export const handleDeleteCommentReply = functions.firestore
  .document('lessons/{lessonId}/comments/{commentId}/replies/{replyId}')
  .onDelete(async (snap, context) => {
    const { lessonId, commentId } = context.params;

    return catchErrors(decrementReplyCount(lessonId, commentId));
  });

//////////////////////////////////////////////////////
/** onDelete Event Handlers for Deleting Replies Subcollection  */
//////////////////////////////////////////////////////

// When a user deletes a comment, delete all replies of that comment
const batchDeleteReplies: any = async (lessonId: any, commentId: any) => {
  // return await client.delete(`lessons/${lessonId}/comments/${commentId}/replies`, {
  //   project: process.env.GCLOUD_PROJECT,
  //   recursive: true,
  //   yes: true,
  // });

  // Limit replies fetch by 100 to avoid excessive memory user
  const snapshots = await db
    .collection('lessons')
    .doc(lessonId)
    .collection('comments')
    .doc(commentId)
    .collection('replies')
    .limit(100)
    .get();

  // End recursive batch delete if there are no more snapshots remaining
  if (snapshots.size === 0) return;

  const batch = db.batch();
  // Queue a batch delete for each doc in the snapshot
  snapshots.docs.forEach(doc => batch.delete(doc.ref));

  await batch.commit();
  // Run batchDeleteReplies again (until snapshots.size === 0)
  return batchDeleteReplies(lessonId, commentId);
};

// When a user deletes a comment, delete all replies of that comment
const batchDeleteLikes: any = async (lessonId: any, commentId: any) => {
  // Limit replies fetch by 100 to avoid excessive memory user
  const snapshots = await db
    .collection('lessons')
    .doc(lessonId)
    .collection('comments')
    .doc(commentId)
    .collection('likes')
    .limit(100)
    .get();

  // End recursive batch delete if there are no more snapshots remaining
  if (snapshots.size === 0) return;

  const batch = db.batch();
  // Queue a batch delete for each doc in the snapshot
  snapshots.docs.forEach(doc => batch.delete(doc.ref));

  await batch.commit();
  // Run batchDeleteReplies again (until snapshots.size === 0)
  return batchDeleteLikes(lessonId, commentId);
};

const deleteComment: any = async (lessonId: any, commentId: any) => {
  const commentRef = db
    .collection('lessons')
    .doc(lessonId)
    .collection('comments')
    .doc(commentId);

  const batch = db.batch();
  batch.delete(commentRef);

  return await batch.commit();
};

export const handleDeleteComment = functions.firestore
  .document('lessons/{lessonId}/comments/{commentId}')
  .onDelete(async (snap, context) => {
    const { lessonId, commentId } = context.params;
    // Batch delete all replies and likes to a deleted comment
    await catchErrors(batchDeleteLikes(lessonId, commentId));
    await catchErrors(batchDeleteReplies(lessonId, commentId));
    return await catchErrors(deleteComment(lessonId, commentId));
  });

//////////////////////////////////////////////////////
/** onDelete Event Handlers for Deleting Comments Subcollection  */
//////////////////////////////////////////////////////

// When a user deletes a comment, delete all replies of that comment
const batchDeleteComments: any = async (lessonId: any) => {
  // Limit replies fetch by 100 to avoid excessive memory user
  const snapshots = await db
    .collection('lessons')
    .doc(lessonId)
    .collection('comments')
    .limit(100)
    .get();

  // End recursive batch delete if there are no more snapshots remaining
  if (snapshots.size === 0) return;

  // Queue a batch delete for each doc in the snapshot
  const batch = db.batch();
  snapshots.docs.forEach(async doc => {
    const { commentId } = doc.data();
    await catchErrors(batchDeleteLikes(lessonId, commentId));
    await catchErrors(batchDeleteReplies(lessonId, commentId));
    batch.delete(doc.ref);
  });

  await batch.commit();
  // Run batchDeleteComments again (until snapshots.size === 0)
  return batchDeleteComments(lessonId);
};

const deleteLesson: any = async (lessonId: any) => {
  const lessonRef = db.collection('lessons').doc(lessonId);
  const batch = db.batch();

  batch.delete(lessonRef);
  return await batch.commit();
};

export const handleDeleteLesson = functions.firestore
  .document('lessons/{lessonId}')
  .onDelete(async (snap, context) => {
    const { lessonId } = context.params;
    // Batch delete all comments to a deleted lesson
    await catchErrors(batchDeleteComments(lessonId));
    return await catchErrors(deleteLesson(lessonId));
  });
