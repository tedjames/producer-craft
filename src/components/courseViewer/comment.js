/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';
import Confetti from 'react-dom-confetti';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
import Linkify from 'linkifyjs/react';

import { AnimatedButton, FlatButton, ButtonText } from '../common';

import StorchHero from '../../assets/storch-hero-image.png';
import StorchHero4 from '../../assets/storch-hero-image-4.png';

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
  transition: all 0.1s ease;
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

const UserAvatar = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 180px;
  margin-right: 15px;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-color: #555;
`;

const MiniAvatar = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 180px;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-color: #555;
  border: 2px #555 solid;
`;

const CommentContainer = styled.div`
  display: flex;
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
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-bottom: 15px;
  padding-top: 5px;
  border-bottom: 1px dotted #ddd;
`;
const InstructorLike = styled.div`
  position: relative;
  margin-bottom: 2.5px;
  margin-left: 2.5px;
`;

const AvatarContainer = styled.div`
  width: 60px;
`;

const CommentReply = ({ name, message }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleReplySettingsClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleReplySettingsClose = () => {
    setAnchorEl(null);
  };
  return (
    <CommentReplyContainer>
      <div style={{ display: 'flex' }}>
        <AvatarContainer>
          <UserAvatar backgroundImage={StorchHero} />
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
        <MenuItem onClick={handleReplySettingsClose}>Delete</MenuItem>
      </Menu>
    </CommentReplyContainer>
  );
};

const Comment = () => {
  const [showReplies, toggleReplies] = useState(false);
  const [liked, likeComment] = useState(false);
  const [showReplyButtons, toggleReplyButtons] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  // Element anchor state for dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
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
  const linkProps = {
    onClick: e => {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Are you sure you want to open this link?')) {
        e.preventDefault();
      }
    },
  };
  return (
    <CommentContainer>
      <AvatarContainer>
        <UserAvatar backgroundImage={StorchHero4} />
      </AvatarContainer>
      <CommentDetails showReplies={showReplies}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CommenterName>Alice C.</CommenterName>
          {/* Settings Button */}
        </div>
        <CommentMessage className="linkify">
          <Linkify options={{ attributes: linkProps }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Linkify>
        </CommentMessage>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CommentActionBar>
            <button
              type="button"
              onClick={() => likeComment(!liked)}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 2.5,
                marginBottom: 2.5,
                paddingLeft: 0,
                background: 'transparent',
                border: '0px',
                outline: 'none',
              }}
            >
              <ActionIcon activated={liked}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  style={{ position: 'relative', top: 1 }}
                  fill={liked ? 'red' : '#bebebe'}
                  stroke="none"
                  strokeWidth="0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-heart"
                  onClick={() => likeComment(!liked)}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </ActionIcon>

              <Confetti active={liked} config={confettiConfig} />
              <LikeCount className="disable-selection">4 Likes</LikeCount>
            </button>
            <button
              onClick={() => toggleReplies(!showReplies)}
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

              <CommentAction
                className="disable-selection"
                onClick={() => toggleReplies(!showReplies)}
                style={{ marginRight: 5 }}
              >
                8 Replies
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
              <MenuItem onClick={handleSettingsClose}>Delete</MenuItem>
            </Menu>

            {/* Instructor Like */}
            <InstructorLike>
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
            </InstructorLike>
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
              <FlatButton>
                <ButtonText>Submit</ButtonText>
              </FlatButton>
            </CommentButtons>

            {/* Comment Replies */}
            <CommentReply name="Joel O." message="Sick track! Deff following you." />
            <CommentReply name="Joel O." message="Sick track! Deff following you." />
            <CommentReply name="Joel O." message="Sick track! Deff following you." />
            <AnimatedButton
              onClick={() => null}
              containerStyle={{
                width: 278,
                alignSelf: 'flex-start',
                marginTop: 5,
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

export default Comment;
