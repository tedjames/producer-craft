import React, { Component } from 'react';
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
  width: 55px;
  border-radius: 180px;
  margin-right: 15px;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-color: #555;
`;
const FieldCard = styled.div`
  height: 56px;
  background: #fff;
  border-radius: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 15px;
  padding-right: 15px;
  z-index: 10;
`;

const CommentButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
  transform: ${props => (props.message ? 'translateY(0px)' : 'translateY(-60px)')};
  margin-bottom: ${props => (props.message ? '0px' : '-60px')};
  opacity: ${props => (props.message ? '1' : '0')};
  transition: all 0.35s ease;
`;

const InputField = styled(InputBase)`
  font-family: roboto-condensed !important;
`;

export default class CommentSubmission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <CommentDetails>
          <UserAvatar backgroundImage={StorchProfile} />
          <FieldCard>
            <InputField
              placeholder="Add a public comment..."
              inputProps={{
                'aria-label': 'Comment Submission',
              }}
              value={message}
              onChange={e => this.setState({ message: e.target.value })}
              fullWidth
            />
          </FieldCard>
        </CommentDetails>
        <CommentButtons message={message}>
          <FlatButton style={{ backgroundColor: '#eee', width: 120 }}>
            <ButtonText style={{ color: '#888' }}>Cancel</ButtonText>
          </FlatButton>
          <FlatButton>
            <ButtonText>Submit</ButtonText>
          </FlatButton>
        </CommentButtons>
      </div>
    );
  }
}
