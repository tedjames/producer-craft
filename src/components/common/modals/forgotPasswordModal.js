import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Spinner from 'react-spinkit';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import FlatButton from '../flatButton';
import ButtonText from '../buttonText';

import { emailChanged, resetPassword, showRegistrationModal, authError } from '../../../actions';

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
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    // eslint-disable-next-line no-shadow
    const { resetPassword, email, authError } = this.props;
    if (!email) {
      return authError({ error: 'Please enter your email' });
    }
    return resetPassword({ email });
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { open, close, email, emailChanged, error, loading } = this.props;
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
            onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
            value={email}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogText style={{ textDecoration: 'none', fontSize: 14, marginTop: 10, color: 'red' }}>
            {error}
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
          {loading ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Spinner
                style={{ transform: 'scale(0.5)', opacity: 0.65 }}
                name="line-scale"
                color="blue"
                fadeIn="quarter"
              />
              <DialogText
                style={{ textDecoration: 'none', fontSize: 16, marginTop: 0, color: '#aaa' }}
              >
                Verifying your email...
              </DialogText>
            </div>
          ) : (
            <FlatButton style={{ width: 160 }} onClick={this.handleSubmit}>
              <ButtonText>Submit</ButtonText>
            </FlatButton>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  email: auth.email,
  error: auth.error,
  loading: auth.forgotPasswordLoading,
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
    authError,
  },
)(ForgotPasswordModal);
