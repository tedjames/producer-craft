/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import FlatButton from './flatButton';
import ButtonText from './buttonText';
import ForgotPasswordModal from './forgotPasswordModal';

import {
  loginUser,
  logoutUser,
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  passwordChanged,
  confirmPasswordChanged,
  resetPassword,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  showAuthModal,
  showRegistrationModal,
  showLoginModal,
  clearAuthForm,
} from '../../actions';

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

const SignUpText = styled.p`
  font-family: roboto-condensed, sans-serif;
  color: #222;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 15px;
  cursor: default;
`;

const SignUpButton = styled.a`
  text-decoration: underline;
  text-decoration-color: #bebebe;
  color: #555;
  cursor: pointer;
  :hover,
  :active {
    opacity: 0.65;
  }
`;

const DialogTextButton = styled.a`
  font-family: roboto-condensed, sans-serif;
  font-size: 12px;
  text-align: center;
  color: #888;
  text-decoration: underline;
  text-decoration-color: #bebebe;
  margin-top: 5px;
  cursor: pointer;
  :hover,
  :active {
    opacity: 0.65;
  }
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
class AuthModal extends Component {
  constructor(props) {
    super(props);
    this.handleExit = this.handleExit.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);

    this.state = {
      showForgotPassword: false,
      showPassword: false,
    };
  }

  handleExit() {
    const { showRegistrationModal, clearAuthForm } = this.props;
    this.setState({ showPassword: false });
    showRegistrationModal(false);
    clearAuthForm({ email: true });
  }

  togglePasswordVisibility() {
    const { showPassword } = this.state;
    console.log('TOGGLING PASSWORD');

    this.setState({ showPassword: !showPassword });
  }

  render() {
    // eslint-disable-next-line no-shadow
    const {
      open,
      showAuthModal,
      showRegistrationModal,
      showRegistration,
      showLoginModal,
      email,
      password,
      confirmPassword,
      emailChanged,
      passwordChanged,
      confirmPasswordChanged,
    } = this.props;
    const { showForgotPassword, showPassword } = this.state;
    return (
      <Dialog
        open={open}
        onClose={() => showAuthModal(false)}
        onExited={this.handleExit}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>{showRegistration ? 'Sign Up' : 'Welcome Back'}</DialogTitle>
        <DialogContent>
          <TextField
            style={{ marginBottom: 12.5 }}
            onChange={e => emailChanged(e.target.value)}
            value={email}
            type={showPassword ? 'text' : 'password'}
            autoFocus
            margin="dense"
            id="emailAddress"
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ marginBottom: 12.5 }}
            onChange={e => passwordChanged(e.target.value)}
            value={password}
            type={showPassword ? 'text' : 'password'}
            margin="dense"
            id="password"
            label="Password"
            placeholder="********"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="Toggle password visibility"
                    onClick={this.togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {showRegistration && (
            <TextField
              onChange={e => confirmPasswordChanged(e.target.value)}
              value={confirmPassword}
              type={showPassword ? 'text' : 'password'}
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              placeholder="********"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="Toggle password visibility"
                      onClick={this.togglePasswordVisibility}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </DialogContent>
        <DialogActions
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            paddingBottom: 12.5,
            paddingTop: 20,
          }}
        >
          <FlatButton style={{ width: showRegistration ? 240 : 180 }}>
            <ButtonText>{showRegistration ? 'Create Account' : 'Log In'}</ButtonText>
          </FlatButton>
          {!showRegistration && (
            <SignUpText>
              Need an account?{' '}
              <SignUpButton onClick={() => showRegistrationModal(true)}>Sign Up</SignUpButton>
            </SignUpText>
          )}
          {showRegistration && (
            <SignUpText>
              Already have an account?{' '}
              <SignUpButton onClick={() => showLoginModal(false)}>Log In</SignUpButton>
            </SignUpText>
          )}

          <DialogTextButton onClick={() => this.setState({ showForgotPassword: true })}>
            Forgot your password?
          </DialogTextButton>
          <DialogText
            style={{ textDecoration: 'none', fontSize: 10, marginTop: 2.5, color: '#bebebe' }}
          >
            By logging in, you agree to our{' '}
            <DialogTextButton style={{ fontSize: 10, color: '#bebebe' }}>
              Privacy Policy
            </DialogTextButton>{' '}
            and{' '}
            <DialogTextButton style={{ fontSize: 10, color: '#bebebe' }}>
              Terms of Service
            </DialogTextButton>
            .
          </DialogText>
        </DialogActions>
        <ForgotPasswordModal
          open={showForgotPassword}
          close={() => this.setState({ showForgotPassword: false })}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  open: auth.showModal,
  showRegistration: auth.showRegistration,
  firstName: auth.firstName,
  lastName: auth.lastName,
  email: auth.email,
  password: auth.password,
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
    firstNameChanged,
    lastNameChanged,
    emailChanged,
    passwordChanged,
    confirmPasswordChanged,
    clearAuthForm,
    // User Account Management
    getUser,
    createUser,
    updateUser,
    deleteUser,
    resetPassword,
    // Session Management
    loginUser,
    logoutUser,
    // Modal Management
    showAuthModal,
    showRegistrationModal,
    showLoginModal,
  },
)(AuthModal);
