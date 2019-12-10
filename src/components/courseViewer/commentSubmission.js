import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';

import Avatar from 'react-avatar';
import { createComment } from '../../actions';
import { FlatButton, ButtonText } from '../common';

const CommentDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

const CommentSubmission = ({ lessonId, createComment, user }) => {
  const [message, setMessage] = useState('');
  const [showButtons, toggleButtons] = useState(false);
  const close = () => {
    setMessage('');
    toggleButtons(false);
  };
  const handleSubmit = () => {
    console.log();

    if (message !== '') {
      createComment({ lessonId, userId: user.uid, message, nickname: user.displayName });
      close();
    }
  };
  return (
    <div>
      <CommentDetails>
        <div style={{ width: 58 }}>
          <Avatar
            size="42"
            name={user && user.displayName && user.displayName}
            color="#40baff"
            round
          />
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
        <FlatButton onClick={handleSubmit}>
          <ButtonText>Submit</ButtonText>
        </FlatButton>
      </CommentButtons>
    </div>
  );
};

export default connect(
  null,
  { createComment },
)(CommentSubmission);
