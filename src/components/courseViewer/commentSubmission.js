import React, { useState } from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';

import { FlatButton, ButtonText } from '../common';
import StorchProfile from '../../assets/storch-profile-image-2.jpg';

const CommentDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
const FieldCard = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 10;
`;

const CommentButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
  transform: ${props => (props.showButtons ? 'translateY(0px)' : 'translateY(-60px)')};
  margin-bottom: ${props => (props.showButtons ? '10px' : '-20px')};
  opacity: ${props => (props.showButtons ? '1' : '0')};
  transition: all 0.35s ease;
`;

const InputField = styled(InputBase)`
  font-family: roboto-condensed !important;
`;

const CommentSubmission = () => {
  const [message, setMessage] = useState('');
  const [showButtons, toggleButtons] = useState(false);
  const close = () => {
    setMessage('');
    toggleButtons(false);
  };
  return (
    <div>
      <CommentDetails>
        <div style={{ width: 58 }}>
          <UserAvatar backgroundImage={StorchProfile} />
        </div>
        <FieldCard>
          <InputField
            onFocus={() => toggleButtons(true)}
            onBlur={() => !message && toggleButtons(false)}
            placeholder="Add a comment or share music..."
            inputProps={{
              'aria-label': 'Comment Submission',
            }}
            value={message}
            onChange={e => setMessage(e.target.value)}
            fullWidth
            multiline
          />
        </FieldCard>
      </CommentDetails>
      <CommentButtons showButtons={message || showButtons}>
        <FlatButton
          onClick={() => close()}
          style={{ backgroundColor: 'rgba(0,0,0,0)', width: 120 }}
        >
          <ButtonText style={{ color: '#888' }}>Cancel</ButtonText>
        </FlatButton>
        <FlatButton>
          <ButtonText>Submit</ButtonText>
        </FlatButton>
      </CommentButtons>
    </div>
  );
};

export default CommentSubmission;
