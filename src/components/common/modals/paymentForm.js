import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from 'react-stripe-elements';

import FlatButton from '../flatButton';
import ButtonText from '../buttonText';

const FormLabel = styled.p`
  font-family: proxima-nova, sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 5px;
  color: #aaa;
  margin-bottom: 0px;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px dotted #eee;
  height: 1px;
  background: transparent;
  margin-top: 7.5px;
  margin-bottom: 15px;
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

const PaymentForm = ({
  handleSubmit,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  loading,
  error,
}) => {
  return (
    <form>
      <Divider />
      <FormLabel>Full Name</FormLabel>
      <input
        onChange={e => setFirstName(e.target.value)}
        value={firstName}
        className="stripeCustomElement cardFirstName"
        type="text"
        placeholder="First Name"
        onKeyPress={e => e.key === 'Enter' && handleSubmit()}
      />
      <input
        onChange={e => setLastName(e.target.value)}
        value={lastName}
        className="stripeCustomElement cardLastName"
        type="text"
        placeholder="Last Name"
        onKeyPress={e => e.key === 'Enter' && handleSubmit()}
      />
      <FormLabel>Card Details</FormLabel>
      <CardNumberElement
        style={{
          base: {
            fontSize: '16px',
            fontFamily: 'Roboto Condensed, Helvetica, sans-serif',
          },
        }}
        className="cardNumber"
      />
      <CardExpiryElement
        style={{
          base: {
            fontSize: '16px',
            fontFamily: 'Roboto Condensed, Helvetica, sans-serif',
          },
        }}
        className="cardExpire"
      />
      <CardCvcElement
        style={{
          base: {
            fontSize: '16px',
            fontFamily: 'Roboto Condensed, Helvetica, sans-serif',
          },
        }}
        className="cardCvc"
      />
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <DialogText style={{ textDecoration: 'none', fontSize: 14, marginTop: 10, color: 'red' }}>
          {error}
        </DialogText>
        <DialogText
          style={{ textDecoration: 'none', fontSize: 10, marginTop: 0, color: '#bebebe' }}
        >
          By completing this purchase, you agree to our{' '}
          <DialogTextButton style={{ fontSize: 10, color: '#bebebe' }}>
            Privacy Policy
          </DialogTextButton>{' '}
          and{' '}
          <DialogTextButton style={{ fontSize: 10, color: '#bebebe' }}>
            Terms of Service
          </DialogTextButton>
          .
        </DialogText>
      </div>
      <div
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
              Processing Payment...
            </DialogText>
          </div>
        ) : (
          <FlatButton
            onClick={handleSubmit}
            style={{
              width: 280,
              marginTop: 7.5,
              alignSelf: 'center',
              marginBottom: 10,
            }}
          >
            <ButtonText>COMPLETE PURCHASE</ButtonText>
          </FlatButton>
        )}
      </div>
    </form>
  );
};

export default PaymentForm;
