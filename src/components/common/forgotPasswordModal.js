import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import FlatButton from './flatButton';
import ButtonText from './buttonText';

import { emailChanged, resetPassword, showRegistrationModal } from '../../actions';

const DialogTitle = styled.p`
  font-family: proxima-nova, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #888;
  letter-spacing: 4.2px;
  text-transform: uppercase;
  cursor: default;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 10px;
`;

const DialogText = styled.p`
  font-family: roboto-condensed, sans-serif;
  font-size: 12px;
  text-align: center;
  color: #888;
  text-decoration: underline;
  text-decoration-color: #bebebe;
  margin-top: 5px;
  cursor: default;
`;
class ForgotPasswordModal extends PureComponent {
  render() {
    // eslint-disable-next-line no-shadow
    const { open, close, email, emailChanged } = this.props;
    return (
      <Dialog open={open} onClose={() => close()} aria-labelledby="form-dialog-title">
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="emailAddress"
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            fullWidth
            variant="outlined"
            onChange={e => emailChanged(e.target.value)}
            value={email}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogText
            style={{ textDecoration: 'none', fontSize: 10, marginTop: 10, color: 'green' }}
          >
            Reset link sent. Please check your email.
          </DialogText>
        </DialogContent>
        <DialogActions
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingBottom: 15,
            paddingTop: 5,
          }}
        >
          <FlatButton style={{ width: 160 }}>
            <ButtonText>Submit</ButtonText>
          </FlatButton>
        </DialogActions>
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
    // User Account Management
    resetPassword,
  },
)(ForgotPasswordModal);
