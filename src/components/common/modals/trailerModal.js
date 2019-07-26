import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import ReactJWPlayer from 'react-jw-player';
import VideoImage from '../../../assets/hero-image-5.jpg';

import FlatButton from '../flatButton';
import ButtonText from '../buttonText';

import {
  emailChanged,
  resetPassword,
  showRegistrationModal,
  showAuthModal,
} from '../../../actions';

const VideoContainer = styled.div`
  width: 70vw;
  padding-top: 0px;
  margin: 0px;
  @media (min-width: 2000px) {
    width: 30vw;
  }
  @media (min-width: 1700px) and (max-width: 1999px) {
    width: 40vw;
  }
  @media (min-width: 1500px) and (max-width: 1699px) {
    width: 50vw;
  }
  @media (min-width: 1300px) and (max-width: 1499px) {
    width: 60vw;
  }
  @media (max-width: 480px) {
    width: 100%;
    padding-top: 40vw;
  }
`;

const DialogActions2 = styled(DialogActions)`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  @media (max-width: 400px) {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: wrap !important;
    flex-direction: column;
  }
`;

const FlatButton2 = styled(FlatButton)`
  @media (min-width: 376px) and (max-width: 480px) {
    position: relative;
    bottom: 130px;
  }
  @media (max-width: 375px) {
    position: relative;
    bottom: 140px;
    left: 3px;
  }
`;

const FlatButton3 = styled(FlatButton)`
  @media (max-width: 480px) {
    position: relative;
    bottom: 130px;
  }
`;

class TrailerModal extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    const { close, showRegistrationModal } = this.props;
    showRegistrationModal(true);
    close();
  }

  handleEnroll() {
    const { showEnrollModal, close } = this.props;
    showEnrollModal(true);
    close();
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { open, close, user } = this.props;
    return (
      <Dialog
        open={open}
        onClose={() => close()}
        aria-labelledby="form-dialog-title"
        classes={{ paperFullWidth: 'true' }}
        maxWidth={false}
        id="trailer-dialog-transparent"
        fullScreen={window.innerWidth < 481}
      >
        <DialogContent style={{ padding: 0 }}>
          <VideoContainer>
            <ReactJWPlayer
              playerId="my-jw-player-instance"
              playerScript="https://cdn.jwplayer.com/libraries/dYq2UTto.js"
              playlist="https://cdn.jwplayer.com/v2/playlists/fxELLat1"
              image={VideoImage}
              onDisplayClick={this.onDisplayClick}
              primary="html5"
              isAutoPlay
              displayMode="shelf"
            />
          </VideoContainer>
        </DialogContent>
        <DialogActions2>
          <FlatButton2
            onClick={user ? this.handleEnroll : this.handleSignUp}
            style={{ width: 150 }}
          >
            <ButtonText>{user ? 'ENROLL' : 'SIGN UP'}</ButtonText>
          </FlatButton2>
          <FlatButton3
            onClick={() => close()}
            style={{ background: 'rgba(238,238,238,0.1)', width: 150 }}
          >
            <ButtonText style={{ color: '#eee' }}>CLOSE</ButtonText>
          </FlatButton3>
        </DialogActions2>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  email: auth.email,
  confirmPassword: auth.confirmPassword,
  error: auth.error,
  loading: auth.loading,
  userDetails: auth.userDetails,
  user: auth.user,
});

export default connect(
  mapStateToProps,
  {
    // Form Actions
    emailChanged,
    // Modals
    showRegistrationModal,
    showAuthModal,
    // User Account Management
    resetPassword,
  },
)(TrailerModal);
