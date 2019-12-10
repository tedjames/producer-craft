/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import Confetti from 'react-dom-confetti';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Swal from 'sweetalert2';

// UUID for Generating Unique IDs
import uuidv4 from 'uuid/v4';

import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import Linkify from 'linkifyjs/react';

import Avatar from 'react-avatar';

import { db } from '../../database';

import {
  deleteComment,
  likeComment,
  dislikeComment,
  createCommentReply,
  deleteCommentReply,
} from '../../actions';
import { AnimatedButton, FlatButton, ButtonText } from '../common';

// import StorchHero from '../../assets/storch-hero-image.png';

// Apply hashtag plugin to linkify
hashtag(linkify);

const confettiConfig = {
  angle: 90,
  spread: 60,
  startVelocity: 45,
  elementCount: 50,
  dragFriction: 0.1,
  duration: 3000,
  stagger: 0,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

const FieldCard = styled.div`
  background: ${props => (props.showReplyButtons ? '#fff' : 'transparent')};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 15px;
  margin-right: 0px;
  margin-bottom: -20px;
  border: ${props => (props.showReplyButtons ? '0px #ddd solid' : '1px #ddd solid')};
  transition: all 0.3s ease;
`;

const CommentButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
  transform: ${props => (props.showButtons ? 'translateY(18px)' : 'translateY(-40px)')};
  margin-bottom: ${props => (props.showButtons ? '30px' : '-20px')};
  opacity: ${props => (props.showButtons ? '1' : '0')};
  transition: all 0.35s ease;
`;

const InputField = styled(InputBase)`
  font-family: roboto-condensed !important;
`;

// const UserAvatar = styled.div`
//   height: 48px;
//   width: 48px;
//   border-radius: 180px;
//   margin-right: 15px;
//   background-repeat: no-repeat;
//   background-image: ${props => `url(${props.backgroundImage})`};
//   background-size: cover;
//   background-color: #555;
// `;

// const MiniAvatar = styled.div`
//   height: 20px;
//   width: 20px;
//   border-radius: 180px;
//   background-repeat: no-repeat;
//   background-image: ${props => `url(${props.backgroundImage})`};
//   background-size: cover;
//   background-color: #555;
//   border: 2px #555 solid;
// `;

const CommentContainer = styled.div`
  display: ${props => (props.deleted ? 'none' : 'flex')};
`;
const CommentDetails = styled.div`
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: ${props => (props.showReplies ? 'rgba(0,0,0,0) dotted 0px' : '#ddd 1px dotted')};
`;
const CommenterName = styled.p`
  font-family: proxima-nova;
  font-weight: 900;
  font-style: black;
  font-size: 12px;
  text-align: left;
  color: #bebebe;
  margin-top: 0px;
  margin-bottom: 10px;
  letter-spacing: 5px;
  text-transform: uppercase;
`;
const CommentMessage = styled.div`
  font-family: Roboto-Condensed, sans-serif;
  font-weight: 500;
  color: #111111;
  font-size: 15px;
`;
const CommentActionBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 17.5px;
  padding-bottom: 5px;
`;
const CommentAction = styled.div`
  font-family: proxima-nova;
  font-weight: 900;
  font-style: black;
  font-size: 12px;
  text-align: left;
  color: #bebebe;
  letter-spacing: 5px;
  margin-right: 15px;
  text-transform: uppercase;
  cursor: pointer;
  margin-left: 7.5px;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.65;
  }
`;

const LikeCount = styled.div`
  font-family: proxima-nova;
  font-weight: 900;
  font-style: black;
  font-size: 12px;
  text-align: left;
  color: #bebebe;
  letter-spacing: 5px;
  margin-right: 5px;
  text-transform: uppercase;
  margin-left: 7.5px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const ActionIcon = styled.div`
  cursor: pointer;
  padding-right: 5px;
  :hover {
    opacity: 0.8;
  }
  :active {
    opacity: 0.65;
  }
  transform: ${props => (props.activated ? 'rotate(0deg)' : 'rotate(360deg)')};
  transform-origin: center;
  transition: all 0.25s ease;
`;

const CommentReplyContainer = styled.div`
  display: ${props => (props.deleted ? 'none' : 'flex')};
  justify-content: space-between;
  margin-top: 10px;
  padding-bottom: 15px;
  padding-top: 5px;
  border-bottom: 1px dotted #ddd;
`;
// const InstructorLike = styled.div`
//   position: relative;
//   margin-bottom: 2.5px;
//   margin-left: 2.5px;
//   display: none;
// `;

const AvatarContainer = styled.div`
  width: 60px;
`;

const CommentReply = ({
  name,
  message,
  commentReplyId,
  lessonId,
  commentId,
  deleteCommentReply,
  setReplyDeleteCount,
  replyDeleteCount,
  newReplies,
  setNewReply,
  cached,
  nickname,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleted, toggleDeleted] = React.useState(false);
  const handleReplySettingsClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleReplySettingsClose = () => {
    setAnchorEl(null);
  };

  const handleCommentReplyDelete = () => {
    console.log('Handling reply delete with: ', lessonId, commentId, commentReplyId);
    console.log('SETTING REPLY DELETE COUNT TO: ', `${replyDeleteCount + 1}`);

    if (!cached) {
      setReplyDeleteCount(replyDeleteCount + 1);
    }
    deleteCommentReply({ lessonId, commentId, commentReplyId });
    handleReplySettingsClose();
    toggleDeleted(true);
    const updatedNewReplies = newReplies.filter(reply => {
      console.log('Filtering: ', reply.id, commentReplyId, reply.id !== commentReplyId);

      return reply.id !== commentReplyId;
    });
    console.log('SETTING NEW REPLIES TO: ', updatedNewReplies);

    setNewReply([...updatedNewReplies]);
  };
  console.log('Reply delete count: ', replyDeleteCount);

  return (
    <CommentReplyContainer deleted={deleted}>
      <div style={{ display: 'flex' }}>
        <AvatarContainer>
          <Avatar size="42" name={name} color="#40baff" round />
        </AvatarContainer>
        <div>
          <CommenterName>{name}</CommenterName>
          <CommentMessage>{message}</CommentMessage>
        </div>
      </div>

      <CommentAction
        onClick={e => handleReplySettingsClick(e)}
        style={{ display: 'flex', marginLeft: 0, alignItems: 'center' }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#bebebe"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-more-vertical"
          style={{ position: 'relative', top: 1 }}
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </CommentAction>

      {/* Reply Settings Menu */}
      <Menu
        id="simple-menu2"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleReplySettingsClose}
      >
        <MenuItem onClick={handleReplySettingsClose}>Report</MenuItem>
        <MenuItem onClick={handleCommentReplyDelete}>Delete</MenuItem>
      </Menu>
    </CommentReplyContainer>
  );
};

const Comment = ({
  key,
  message,
  deleteComment,
  likeComment,
  dislikeComment,
  lessonId,
  commentId,
  user,
  likeCount,
  createCommentReply,
  deleteCommentReply,
  replyCount,
  nickname,
}) => {
  const savedLike = localStorage.getItem(commentId);
  const [showReplies, toggleReplies] = useState(false);
  const [commentReplies, setCommentReplies] = useState([]);
  const [replyDeleteCount, setReplyDeleteCount] = useState(0);
  const [liked, toggleLike] = useState(savedLike ? 1 : 0);
  const [showReplyButtons, toggleReplyButtons] = useState(false);
  const [deleted, toggleDeleted] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [newReplies, setNewReply] = useState([]);
  // Element anchor state for dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const userId = user && user.uid ? user.uid : false;

  const isAdmin = user && user.roles ? user.roles.includes('admin') : false;

  const cancelReply = () => {
    setReplyMessage('');
    toggleReplyButtons(false);
  };
  const handleSettingsClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    if (!user || !isAdmin) {
      return Swal.fire({
        customClass: {
          container: 'my-swal',
        },
        title: 'Unable to Delete',
        text: "Only the comment's author or admins can delete this.",
        type: 'error',
        confirmButtonText: 'Continue',
        timer: 8000,
      });
    }

    setAnchorEl(null);
    deleteComment({ lessonId, commentId });
    return toggleDeleted(true);
  };

  const handleLike = () => {
    if (!user) {
      return Swal.fire({
        customClass: {
          container: 'my-swal',
        },
        title: 'Sign in Required',
        text: 'Please sign in or register an account to leave comments',
        type: 'error',
        confirmButtonText: 'Continue',
        timer: 8000,
      });
    }

    const likeParams = { commentId, lessonId, userId };

    // Sets liked to 0 if the user is disliking or 1 if liking
    // this is used to increment or decrement the like count onCLick
    if (liked === 1) {
      // Set liked to 0 aka false
      toggleLike(0);
      // Save like value in localstorage
      localStorage.removeItem(commentId);
    } else if (savedLike) {
      // Set liked to 0 aka false
      toggleLike(0);
      // Save like value in localstorage
      localStorage.removeItem(commentId);
    } else {
      // Set liked to 1 aka true
      toggleLike(1);
      // Save like value in localstorage
      localStorage.setItem(commentId, 1);
    }
    return liked === 1 ? dislikeComment(likeParams) : likeComment(likeParams);
  };

  const handleReply = () => {
    if (!user) {
      return Swal.fire({
        customClass: {
          container: 'my-swal',
        },
        title: 'Sign in Required',
        text: 'Please sign in or register an account to leave comments',
        type: 'error',
        confirmButtonText: 'Continue',
        timer: 8000,
      });
    }

    const commentReplyId = uuidv4();
    setNewReply([
      { message: replyMessage, id: commentReplyId, nickname: user.displayName },
      ...newReplies,
    ]);
    createCommentReply({
      message: replyMessage,
      nickname: user.displayName,
      lessonId,
      commentId,
      commentReplyId,
      userId,
    });
    cancelReply();
  };

  const fetchCommentReplies = () => {
    if (replyCount > 0) {
      db.collection('lessons')
        .doc(lessonId)
        .collection('comments')
        .doc(commentId)
        .collection('replies')
        .get()
        .then(snapshot => {
          const fetchedCommentReplies = [];
          snapshot.forEach(doc => {
            fetchedCommentReplies.push(doc.data());
          });
          console.log('Fetched comment replies: ', fetchedCommentReplies);
          setCommentReplies(fetchedCommentReplies);
        })
        .catch(err => {
          console.log('Error fetching comment replies', err);
        });
    }
  };

  const handleToggleReplies = () => {
    if (showReplies) {
      toggleReplies(false);
    } else {
      toggleReplies(true);
      return newReplies.length > 0 ? null : fetchCommentReplies();
    }
  };

  // Default action for opening URLs found in comments
  const linkProps = {
    onClick: e => {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Are you sure you want to open this link?')) {
        e.preventDefault();
      }
    },
  };

  return (
    <CommentContainer key={key} deleted={deleted}>
      <AvatarContainer>
        <Avatar size="42" name={nickname} color="#40baff" round />
      </AvatarContainer>
      <CommentDetails showReplies={showReplies}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CommenterName>{nickname || 'Anonymous User'}</CommenterName>
          {/* Settings Button */}
        </div>
        <CommentMessage className="linkify">
          <Linkify options={{ attributes: linkProps }}>
            {message ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua.'}
          </Linkify>
        </CommentMessage>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CommentActionBar>
            <button
              type="button"
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 2.5,
                marginBottom: 2.5,
                paddingLeft: 0,
                background: 'transparent',
                border: '0px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <ActionIcon activated={liked}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  style={{ position: 'relative', top: 1 }}
                  fill={liked || savedLike ? 'red' : '#bebebe'}
                  stroke="none"
                  strokeWidth="0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-heart"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </ActionIcon>

              <Confetti active={liked} config={confettiConfig} />
              <LikeCount className="disable-selection">
                {likeCount && liked ? `${likeCount} Like${likeCount > 1 ? 's' : ''}` : ''}
                {!likeCount && !liked ? 'Like' : ''}
                {likeCount && !liked
                  ? `${likeCount - 1 === 0 ? '' : likeCount - 1} Like${likeCount > 1 ? 's' : ''}`
                  : ''}
                {!likeCount && liked === 1 ? '1 Like' : ''}
              </LikeCount>
            </button>
            <button
              onClick={handleToggleReplies}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                marginTop: 2.5,
                marginBottom: 2.5,
                marginRight: 0,
                paddingLeft: 0,
                background: 'transparent',
                border: '0px',
                outline: 'none',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={showReplies ? '#7eb4ea' : '#bebebe'}
                stroke="none"
                strokeWidth="0"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-message-circle"
                style={{ marginRight: 5 }}
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>

              <CommentAction className="disable-selection" style={{ marginRight: 5 }}>
                {replyCount > 1 && `${replyCount + newReplies.length - replyDeleteCount} Replies`}
                {replyCount === 1 && newReplies.length > 0
                  ? `${replyCount + newReplies.length - replyDeleteCount} Replies`
                  : ''}
                {replyCount === 1 && newReplies.length === 0
                  ? `${replyCount + newReplies.length} Reply`
                  : ''}
                {replyCount === 0 && newReplies.length > 1
                  ? `${newReplies.length - replyDeleteCount} Replies`
                  : ''}
                {replyCount === 0 && newReplies.length === 1 ? '1 Reply' : ''}
                {replyCount === 0 && newReplies.length === 0 ? 'Reply' : ''}
                {replyCount === 0 && !newReplies ? 'Reply' : ''}
              </CommentAction>
            </button>

            {/* Settings Menu */}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleSettingsClose}
            >
              <MenuItem onClick={handleSettingsClose}>Report</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>

            {/* Instructor Like */}
            {/* <InstructorLike>
              <MiniAvatar backgroundImage={StorchHero} />
              <svg
                style={{ position: 'absolute', bottom: -4, right: -5 }}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="red"
                stroke="#fff"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-heart"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </InstructorLike> */}
          </CommentActionBar>
          <CommentAction
            onClick={e => handleSettingsClick(e)}
            style={{
              marginLeft: 0,
              marginRight: 10,
              marginBottom: 9,
              alignSelf: 'flex-start',
              marginTop: 20,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#bebebe"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-more-vertical"
              style={{ position: 'relative', top: 1 }}
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </CommentAction>
        </div>

        {/* Replies */}
        {showReplies && (
          <div>
            <FieldCard showReplyButtons={showReplyButtons}>
              <InputField
                style={{ zIndex: 10 }}
                onFocus={() => toggleReplyButtons(true)}
                onBlur={() => !replyMessage && toggleReplyButtons(false)}
                placeholder="Add a public reply..."
                inputProps={{
                  'aria-label': 'Comment Submission',
                }}
                value={replyMessage}
                onChange={e => setReplyMessage(e.target.value)}
                fullWidth
                multiline
              />
            </FieldCard>
            <CommentButtons showButtons={showReplyButtons}>
              <FlatButton
                onClick={() => cancelReply()}
                style={{ backgroundColor: 'rgba(0,0,0,0)', width: 120 }}
              >
                <ButtonText style={{ color: '#888' }}>Cancel</ButtonText>
              </FlatButton>
              <FlatButton onClick={handleReply}>
                <ButtonText>Submit</ButtonText>
              </FlatButton>
            </CommentButtons>
            {/* Comment Replies */}
            {newReplies.length > 0 &&
              newReplies.map(newReply => {
                return (
                  <CommentReply
                    key={newReply.id}
                    name={user.displayName}
                    commentReplyId={newReply.id}
                    commentId={commentId}
                    lessonId={lessonId}
                    message={newReply.message}
                    deleteCommentReply={deleteCommentReply}
                    setReplyDeleteCount={setReplyDeleteCount}
                    replyDeleteCount={replyDeleteCount}
                    newReplies={newReplies}
                    setNewReply={setNewReply}
                    cached
                  />
                );
              })}

            {commentReplies &&
              commentReplies.map(commentReply => {
                return (
                  <CommentReply
                    key={commentReply.commentReplyId}
                    name={commentReply.nickname}
                    lessonId={lessonId}
                    commentReplyId={commentReply.commentReplyId}
                    commentId={commentId}
                    message={commentReply.message}
                    deleteCommentReply={deleteCommentReply}
                    setReplyDeleteCount={setReplyDeleteCount}
                    replyDeleteCount={replyDeleteCount}
                    newReplies={newReplies}
                    setNewReply={setNewReply}
                  />
                );
              })}
            <AnimatedButton
              onClick={() => null}
              containerStyle={{
                width: 278,
                alignSelf: 'flex-start',
                marginTop: 5,
                display: 'none',
              }}
              textStyle={{ color: '#777' }}
            >
              Show More Replies
            </AnimatedButton>
          </div>
        )}
      </CommentDetails>
    </CommentContainer>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(
  mapStateToProps,
  { deleteComment, likeComment, dislikeComment, createCommentReply, deleteCommentReply },
)(Comment);
