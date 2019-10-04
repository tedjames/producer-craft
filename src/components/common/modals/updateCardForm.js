import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from 'react-stripe-elements';

import FlatButton from '../flatButton';
import ButtonText from '../buttonText';

const Form = styled.form`
  @media (max-width: 480px) {
    width: 80vw;
  }
`;

const FormLabel = styled.p`
  font-family: proxima-nova, sans-serif;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 5px;
  color: #aaa;
  margin-bottom: 0px;
  @media (min-width: 1200px) {
    align-self: center;
    text-align: center;
  }
  @media (max-width: 480px) {
    text-align: center;
    align-self: center;
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
  @media (min-width: 1200px) {
    align-self: center;
    text-align: center;
  }
  @media (max-width: 480px) {
    text-align: center;
    align-self: center;
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

const UpdateCardForm = ({ handleSubmit, loading, error }) => {
  return (
    <Form>
      <FormLabel style={{ marginTop: 25 }}>Update Default Card</FormLabel>
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
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: 'column',
        }}
      >
        {error && (
          <DialogText style={{ textDecoration: 'none', fontSize: 14, marginTop: 10, color: 'red' }}>
            {error}
          </DialogText>
        )}

        <DialogText
          style={{ textDecoration: 'none', fontSize: 10, marginTop: 0, color: '#bebebe' }}
        >
          By adding a payment method, you agree to our{' '}
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
      <ButtonContainer>
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
              marginBottom: 25,
            }}
          >
            <ButtonText>ADD NEW CARD</ButtonText>
          </FlatButton>
        )}
      </ButtonContainer>
    </Form>
  );
};

export default UpdateCardForm;
