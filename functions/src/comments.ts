
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
