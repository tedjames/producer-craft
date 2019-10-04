import React, { Component, useState } from 'react';
import { browserHistory } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import styled, { keyframes } from 'styled-components';
import { RemoveScroll } from 'react-remove-scroll';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { injectStripe, Elements } from 'react-stripe-elements';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import FlatButton from '../flatButton';
import ButtonText from '../buttonText';
import UpdateCardForm from './updateCardForm';
import Footer from '../footer';

import { logoutUser, toggleAccountModal } from '../../../actions';

const FADE_IN_DURATION = '0.45s';

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const Container = styled.div`
  animation: ${fadeIn} ${FADE_IN_DURATION} ease;
  background-color: '#000000';
  overflow-y: scroll;
  width: 100%;
  z-index: 10;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b4b4b4' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-top: 100px;
  padding-left: 60px;
  @media (min-width: 1200px) {
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (max-width: 480px) {
    align-items: center;
    padding-left: 0px;
    padding-right: 15px;
  }
`;

const BackIcon = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 40px;
  border: 1.5px solid rgba(55, 214, 255, 0.25);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  box-shadow: inset 1px 1px 30px -26px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :active {
    opacity: 0.45;
  }
`;

const LessonTitle = styled.p`
  font-family: neue-haas-grotesk-text, sans-serif;
  font-weight: 700;
  font-style: black;
  font-size: 32px;
  text-align: left;
  opacity: 0.25;
  margin-top: 20px;
  margin-bottom: 15px;
  color: #111;
  cursor: default;
`;

const PaymentHistoryCard = styled.div`
  width: 180px;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  background: #fff;
  box-shadow: 1px 1px 70px -20px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
  margin-right: 10px;
  margin-left: 10px;
  padding: 20px;
`;
const PaymentTitle = styled.p`
  font-family: neue-haas-grotesk-text, sans-serif;
  font-size: 16px;
  line-height: 19px;
  color: #333;
  margin: 0px;
  padding: 0px;
  margin-right: 0px;
`;
const PaymentAmount = styled.p`
  font-family: neue-haas-grotesk-text, sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #444;
  margin: 0px;
  margin-top: 5px;
  padding: 0px;
`;
const CardInfo = styled.p`
  font-family: proxima-nova, sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 2.5px;
  font-size: 11px;
  color: #bebebe;
  margin: 0px;
  padding: 0px;
  text-align: left;
  align-self: flex-start;
`;

const EmailText = styled.p`
  font-family: roboto-condensed, sans-serif;
  color: #00ccff;
  cursor: pointer;
  margin-top: 0px;
  margin-bottom: 20px;
  :hover {
    opacity: 0.75;
  }
`;

const SupportText = styled.p`
  font-family: roboto-condensed, sans-serif;
  color: #222;
  margin-bottom: 0px;
  margin-top: 0px;
`;

const CardRow = styled.div`
  display: none;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  @media (min-width: 1200px) {
    display: flex;
    justify-content: center;
    margin-left: 25px;
    margin-right: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  @media (min-width: 1200px) {
    align-self: center;
    text-align: center;
    justify-content: center;
  }
  @media (max-width: 480px) {
    align-self: center;
    text-align: center;
    justify-content: center;
  }
`;

const CardRowMobile = styled.div`
  @media (min-width: 1200px) {
    display: none;
  }
  @media (max-width: 480px) {
    position: relative;
    left: 35px;
  }
`;

const AccountInfoRow = styled.div`
  display: flex;
  @media (max-width: 480px) {
    display: none;
  }
`;

const MobileAccountInfoRow = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    width: 80vw;
  }
`;

const AccountModal = ({ open, onClose, logoutUser, toggleAccountModal }) => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('your@email.com');
  const [username, setUsername] = useState('JohnMusic');
  const HandleDeleteAccount = () => {
    Swal.fire({
      title: 'Delete Account',
      text: 'Are you sure you want to delete your account?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.value) {
        Swal.fire(
          'Account Deleted!',
          'Sorry to see you go! Your purchase history and subscriptions will be saved for the next 12 months in case you decide to come back.',
          'success',
        );
      }
    });
  };
  const HandleCancelPlan = () => {
    Swal.fire({
      title: 'Cancel Plan',
      text: 'Are you sure you want to cancel your all-access pass?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then(result => {
      if (result.value) {
        Swal.fire(
          'Plan Canceled!',
          'Sorry to see you go! Your all-access plan will no longer be renewed.',
          'success',
        );
      }
    });
  };
  const HandleLogout = () => {
    Swal.fire({
      title: 'Log Out',
      text: 'Are you sure you want to log out of your account?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    }).then(result => {
      if (result.value) {
        logoutUser();
        toggleAccountModal(false);
        onClose();
      }
    });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      style={{ background: 'transparent', overflowY: 'scroll', overflowX: 'hidden' }}
      fullScreen
      id="account-modal"
    >
      <DialogContent style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
        <Container id="account-modal">
          <BackIcon onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#444"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-left"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </BackIcon>
          <LessonTitle>My Account</LessonTitle>
          <AccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value="Ted"
              margin="dense"
              id="account-first-name"
              label="First Name"
              type="name"
              placeholder="My Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value="Werbel"
              margin="dense"
              id="account-last-name"
              label="Last Name"
              type="name"
              placeholder="My Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </AccountInfoRow>
          <AccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={username}
              onChange={e => setUsername(e.target.value)}
              margin="dense"
              id="account-username"
              label="Username"
              type="name"
              placeholder="My Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin="dense"
              id="account-email"
              label="Email"
              type="name"
              placeholder="My Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </AccountInfoRow>

          {/* Mobile Responsive - Account Info Field */}
          <MobileAccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              margin="dense"
              id="account-first-name-mobile"
              label="First Name"
              type="name"
              placeholder="My Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              margin="dense"
              id="account-last-name-mobile"
              label="Last Name"
              type="name"
              placeholder="My Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MobileAccountInfoRow>
          <MobileAccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={username}
              onChange={e => setUsername(e.target.value)}
              margin="dense"
              id="account-username-mobile"
              label="Username"
              type="name"
              placeholder="My Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={email}
              onChange={e => setEmail(e.target.value)}
              margin="dense"
              id="account-email-mobile"
              label="Email"
              type="name"
              placeholder="My Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MobileAccountInfoRow>

          <FlatButton style={{ width: 260, marginTop: 5, marginBottom: 20 }}>
            <ButtonText>SUBMIT CHANGES</ButtonText>
          </FlatButton>
          <LessonTitle>Payment Method</LessonTitle>
          <Cards
            number="7543"
            name="Ted Werbel"
            expiry="11/2021"
            cvc="xxx"
            issuer="visa"
            preview
            style={{ marginLeft: '0px !important' }}
          />
          <Elements
            fonts={[{ cssSrc: 'https://fonts.googleapis.com/css?family=Roboto+Condensed' }]}
          >
            <InjectedForm />
          </Elements>

          <LessonTitle>Purchase History</LessonTitle>
          <div style={{ width: '100%', marginLeft: '-60px' }}>
            <CardRowMobile>
              <CustomHorizontalScrollView
                key=".horizontal-scroll-payment-methods"
                arrowColor="#888"
                style={{
                  zIndex: 100,
                  paddingTop: 60,
                  paddingBottom: 15,
                  marginTop: '-50px',
                  marginBottom: '-15px',
                }}
              >
                <PaymentHistoryCard>
                  <div style={{ alignSelf: 'flex-start' }}>
                    <CardInfo>10/12/2019</CardInfo>
                    <CardInfo>Mastercard · 7543</CardInfo>
                  </div>

                  <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column' }}>
                    <div style={{ marginBottom: 15, marginTop: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1DB954"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <PaymentTitle>All-Access Subscription</PaymentTitle>
                    <PaymentAmount>
                      <span style={{ fontSize: 17, color: '#5e5e5e' }}>$</span>149.95
                    </PaymentAmount>
                  </div>
                </PaymentHistoryCard>
                <PaymentHistoryCard>
                  <div style={{ alignSelf: 'flex-start' }}>
                    <CardInfo>10/12/2019</CardInfo>
                    <CardInfo>Mastercard · 7543</CardInfo>
                  </div>

                  <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column' }}>
                    <div style={{ marginBottom: 15, marginTop: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1DB954"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <PaymentTitle>All-Access Subscription</PaymentTitle>
                    <PaymentAmount>
                      <span style={{ fontSize: 17, color: '#5e5e5e' }}>$</span>49.95
                    </PaymentAmount>
                  </div>
                </PaymentHistoryCard>
                <PaymentHistoryCard>
                  <div style={{ alignSelf: 'flex-start' }}>
                    <CardInfo>10/12/2019</CardInfo>
                    <CardInfo>Mastercard · 7543</CardInfo>
                  </div>

                  <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column' }}>
                    <div style={{ marginBottom: 15, marginTop: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1DB954"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <PaymentTitle>All-Access Subscription</PaymentTitle>
                    <PaymentAmount>
                      <span style={{ fontSize: 17, color: '#5e5e5e' }}>$</span>49.95
                    </PaymentAmount>
                  </div>
                </PaymentHistoryCard>
                <PaymentHistoryCard>
                  <div style={{ alignSelf: 'flex-start' }}>
                    <CardInfo>10/12/2019</CardInfo>
                    <CardInfo>Mastercard · 7543</CardInfo>
                  </div>

                  <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column' }}>
                    <div style={{ marginBottom: 15, marginTop: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1DB954"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <PaymentTitle>All-Access Subscription</PaymentTitle>
                    <PaymentAmount>
                      <span style={{ fontSize: 17, color: '#5e5e5e' }}>$</span>49.95
                    </PaymentAmount>
                  </div>
                </PaymentHistoryCard>
                <PaymentHistoryCard>
                  <div style={{ alignSelf: 'flex-start' }}>
                    <CardInfo>10/12/2019</CardInfo>
                    <CardInfo>Mastercard · 7543</CardInfo>
                  </div>

                  <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column' }}>
                    <div style={{ marginBottom: 15, marginTop: 40 }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1DB954"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-check-circle"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <PaymentTitle>All-Access Subscription</PaymentTitle>
                    <PaymentAmount>
                      <span style={{ fontSize: 17, color: '#5e5e5e' }}>$</span>49.95
                    </PaymentAmount>
                  </div>
                </PaymentHistoryCard>
              </CustomHorizontalScrollView>
            </CardRowMobile>
            <CardRow>
              <PaymentHistoryCard>
                <div style={{ alignSelf: 'flex-start' }}>
                  <CardInfo>10/12/2019</CardInfo>
                  <CardInfo>Mastercard · 7543</CardInfo>
                </div>

                <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column' }}>
                  <div style={{ marginBottom: 15, marginTop: 40 }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1DB954"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check-circle"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <PaymentTitle>All-Access Subscription</PaymentTitle>
                  <PaymentAmount>
                    <span style={{ fontSize: 17, color: '#5e5e5e' }}>$</span>49.95
                  </PaymentAmount>
                </div>
              </PaymentHistoryCard>
              <PaymentHistoryCard>
                <div style={{ alignSelf: 'flex-start' }}>
                  <CardInfo>10/12/2019</CardInfo>
                  <CardInfo>Mastercard · 7543</CardInfo>
                </div>

                <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column' }}>
                  <div style={{ marginBottom: 15, marginTop: 40 }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1DB954"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check-circle"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <PaymentTitle>All-Access Subscription</PaymentTitle>
                  <PaymentAmount>
                    <span style={{ fontSize: 17, color: '#5e5e5e' }}>$</span>49.95
                  </PaymentAmount>
                </div>
              </PaymentHistoryCard>
              <PaymentHistoryCard>
                <div style={{ alignSelf: 'flex-start' }}>
                  <CardInfo>10/12/2019</CardInfo>
                  <CardInfo>Visa · 7543</CardInfo>
                </div>

                <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column' }}>
                  <div style={{ marginBottom: 15, marginTop: 40 }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1DB954"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check-circle"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <PaymentTitle>All-Access Subscription</PaymentTitle>
                  <PaymentAmount>
                    <span style={{ fontSize: 17, color: '#5e5e5e' }}>$</span>49.95
                  </PaymentAmount>
                </div>
              </PaymentHistoryCard>
              <PaymentHistoryCard>
                <div style={{ alignSelf: 'flex-start' }}>
                  <CardInfo>10/12/2019</CardInfo>
                  <CardInfo>Mastercard · 7543</CardInfo>
                </div>

                <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column' }}>
                  <div style={{ marginBottom: 15, marginTop: 40 }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1DB954"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check-circle"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <PaymentTitle>All-Access Subscription</PaymentTitle>
                  <PaymentAmount>
                    <span style={{ fontSize: 17, color: '#5e5e5e' }}>$</span>49.95
                  </PaymentAmount>
                </div>
              </PaymentHistoryCard>
              <PaymentHistoryCard>
                <div style={{ alignSelf: 'flex-start' }}>
                  <CardInfo>10/12/2019</CardInfo>
                  <CardInfo>Mastercard · 7543</CardInfo>
                </div>

                <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column' }}>
                  <div style={{ marginBottom: 15, marginTop: 40 }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1DB954"
                      strokeOpacity="0.5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-check-circle"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <PaymentTitle>All-Access Subscription</PaymentTitle>
                  <PaymentAmount>
                    <span style={{ fontSize: 17, color: '#5e5e5e' }}>$</span>49.95
                  </PaymentAmount>
                </div>
              </PaymentHistoryCard>
            </CardRow>
          </div>

          <LessonTitle style={{ marginBottom: 7.5 }}>Support</LessonTitle>
          <SupportText style={{ color: '#222' }}>
            For any questions or concerns please email us at:
          </SupportText>
          <EmailText>support@producercraft.com</EmailText>
          <ButtonContainer onClick={HandleLogout}>
            <FlatButton
              style={{
                width: 280,
                marginTop: 7.5,
                alignSelf: 'center',
                marginBottom: 20,
              }}
            >
              <ButtonText>LOG OUT</ButtonText>
            </FlatButton>
          </ButtonContainer>
          <ButtonContainer style={{ marginBottom: 20 }}>
            <ButtonText style={{ color: '#ccc' }}>
              <span onClick={HandleDeleteAccount}>DELETE ACCOUNT</span> ·{' '}
              <span onClick={HandleCancelPlan}>CANCEL PLAN</span>
            </ButtonText>
          </ButtonContainer>
        </Container>
        <Footer />
      </DialogContent>
    </Dialog>
  );
};

export default connect(
  null,
  { logoutUser, toggleAccountModal },
)(AccountModal);

// NOTE: Form Container

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      firstName: 'Ted', // Will later be refactored to fetch from DB
      lastName: 'Werbel', // Same here... ^
      loading: false,
      error: '',
    };
  }

  handleError(error) {
    this.setState({ error, loading: false });
  }

  async handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const { firstName, lastName } = this.state;
    const { stripe, productId, amount, togglePaymentModal } = this.props;
    this.setState({ loading: true });

    // Create source with Stripe API
    console.log('Creating Source...');
    const { source, error } = await stripe.createSource({
      type: 'card',
      owner: {
        name: `${firstName} ${lastName}`,
      },
    });
    console.log('Source received: ', source);
    // Handle source creation errors
    if (error) {
      console.log('Error creating source: ', error);
      this.setState({ loading: false });
      return this.handleError(`${error.message}`);
    }

    // Remove loading indicator
    this.setState({ loading: false });
    togglePaymentModal(false);
    Swal.fire({
      customClass: {
        container: 'my-swal',
      },
      title: 'Card Details Updated',
      text: 'Your payment method has successfully been updated!',
      type: 'success',
      confirmButtonText: 'Continue',
    });

    return console.log('Default card updated: ', source);
  }

  render() {
    const { firstName, lastName, loading, error } = this.state;
    return (
      <UpdateCardForm
        firstName={firstName}
        lastName={lastName}
        setFirstName={firstName => this.setState({ firstName })}
        setLastName={lastName => this.setState({ lastName })}
        handleSubmit={this.handleSubmit}
        error={error}
        loading={loading}
      />
    );
  }
}

const InjectedForm = injectStripe(FormContainer);

// CUSTOM HORIZONTAL SCROLL

const ScrollContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 10px;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar-track {
    display: none;
  }
  scrollbar-color: transparent;
  z-index: 180;
`;

const LeftArrowIcon = styled.div`
  flex: 0 0 auto;
  position: absolute;
  left: 10px;
  top: 130px;
  z-index: 200;
  opacity: ${props => (props.showLeftArrow ? '0.2' : '0')};
  transition: opacity 300ms ease;
`;

const RightArrowIcon = styled.div`
  flex: 0 0 auto;
  position: absolute;
  right: 10px;
  top: 130px;
  z-index: 200;
  opacity: ${props => (props.showRightArrow ? '0.2' : '0')};
  transition: opacity 300ms ease;
`;

const ArrowScrolling = styled.div`
  position: relative;
  z-index: 190;
`;

// eslint-disable-next-line react/no-multi-comp
export class CustomHorizontalScrollView extends Component {
  constructor(props) {
    super(props);
    this.handleArrowRight = this.handleArrowRight.bind(this);
    this.handleArrowLeft = this.handleArrowLeft.bind(this);
    this.handleInstructorsScroll = this.handleInstructorsScroll.bind(this);

    this.state = {
      isTouchDevice: false,
      showLeftArrow: false,
      showRightArrow: true,
    };
  }

  // eslint-disable-next-line consistent-return
  componentDidMount() {
    if ('ontouchstart' in document.documentElement) {
      // disable arrows if on touch screen device
      return this.setState({ isTouchDevice: true });
    }
    // handle horizontal draggable scroll on non-touch devices
    const slider = document.querySelector('.horizontal-scroll-payment-methods');
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener('mousedown', e => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      // eslint-disable-next-line prefer-destructuring
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  componentWillUnmount() {
    const slider = document.querySelector('.horizontal-scroll-payment-methods');
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.removeEventListener('mousedown', e => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      // eslint-disable-next-line prefer-destructuring
      scrollLeft = slider.scrollLeft;
    });
    slider.removeEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.removeEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.removeEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  handleArrowRight() {
    const slider = document.querySelector('.horizontal-scroll-payment-methods');
    slider.scrollBy(500, 0);
    console.log('Handling arrow right', slider);
  }

  handleArrowLeft() {
    const slider = document.querySelector('.horizontal-scroll-payment-methods');
    slider.scrollBy(-500, 0);
    console.log('Handling arrow left', slider);
  }

  handleInstructorsScroll(e) {
    const { isTouchDevice } = this.state;

    if (!isTouchDevice) {
      if (e.target.scrollLeft > 0) {
        this.setState({ showLeftArrow: true });
      } else {
        this.setState({ showLeftArrow: false });
      }
      if (e.target.scrollLeft > e.target.scrollWidth - 500) {
        this.setState({ showRightArrow: false });
      } else {
        this.setState({ showRightArrow: true });
      }
    }
    return null;
  }

  render() {
    const { children, style, arrowColor } = this.props;
    const { showLeftArrow, showRightArrow, isTouchDevice } = this.state;

    return (
      <div key="horizonatal-scrollview-container">
        {!isTouchDevice && (
          <ArrowScrolling key="arrow-scrolling">
            <LeftArrowIcon showLeftArrow={showLeftArrow}>
              <svg
                onClick={this.handleArrowLeft}
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke={arrowColor || '#fff'}
                strokeWidth="1.5"
                className="feather feather-arrow-left"
              >
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </LeftArrowIcon>
            <RightArrowIcon showRightArrow={showRightArrow}>
              <svg
                onClick={this.handleArrowRight}
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke={arrowColor || '#fff'}
                strokeWidth="1.5"
                className="feather feather-arrow-left"
              >
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </RightArrowIcon>
          </ArrowScrolling>
        )}

        <ScrollContainer
          style={style}
          className="horizontal-scroll-payment-methods"
          onScroll={this.handleInstructorsScroll}
          key="scroll-container"
        >
          {children}
          <div style={{ width: 20, height: 40, flex: '0 0 auto' }} />
        </ScrollContainer>
      </div>
    );
  }
}
