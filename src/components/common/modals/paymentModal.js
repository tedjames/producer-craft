/* eslint-disable react/no-multi-comp */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { injectStripe, Elements } from 'react-stripe-elements';
import { functions } from 'firebase';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import FlatButton from '../flatButton';
import ButtonText from '../buttonText';

import { togglePaymentModal } from '../../../actions';

import PaymentForm from './paymentForm';

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

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName } = this.state;
    const { stripe, handleError } = this.props;

    // Verify that first and last names have been provided
    if (!firstName || !lastName) {
      return handleError('Please include a first and last name');
    }

    // Create source with Stripe API
    console.log('Creating Source...');
    const { source, error } = await stripe.createSource({
      type: 'card',
      owner: {
        name: `${firstName} ${lastName}`,
      },
    });
    console.log('Source received: ', source);

    if (error) {
      // Handle source creation errors
      console.log('Error creating source: ', error);
      return handleError(`Error: ${error}`);
    }

    // Send to cloud function
    console.log('Sending source to cloud function...');
    const stripeAttachSource = functions().httpsCallable('stripeAttachSource');
    const res = await stripeAttachSource({ source: source.id });
    return console.log('Sent source to cloud function and received reponse: ', res);
  }

  render() {
    const { firstName, lastName } = this.state;
    return (
      <PaymentForm
        firstName={firstName}
        lastName={lastName}
        setFirstName={firstName => this.setState({ firstName })}
        setLastName={lastName => this.setState({ lastName })}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const InjectedForm = injectStripe(FormContainer);

class SubscriberModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('HANDLING SUBMIT');
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { open, togglePaymentModal, productId, amount } = this.props;
    return (
      <Dialog
        open={open}
        onClose={() => togglePaymentModal(false)}
        aria-labelledby="form-dialog-title"
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        id="subscriberModal"
      >
        <DialogTitle
          style={{
            marginBottom: 0,
            paddingBottom: 0,
            color: '#aaa',
            display: 'flex',
            justifyContent: 'space-between',
            marginRight: 30,
          }}
        >
          <span style={{ display: 'flex', marginLeft: 23, alignItems: 'center' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              strokeOpacity="0.65"
              stroke="#ccc"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-lock"
              style={{ marginRight: 10, position: 'relative', top: 0 }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secured with SSL
          </span>
          <span>
            <svg
              onClick={() => togglePaymentModal(false)}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
              style={{ position: 'relative', top: 0 }}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </span>
        </DialogTitle>
        <DialogTitle
          style={{
            marginTop: 10,
            marginBottom: 5,
            paddingBottom: 0,
            paddingTop: 10,
            fontSize: 17,
            color: '#555',
            textAlign: 'left',
            marginLeft: 23.5,
            marginRight: 30,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span>{productId}</span>
          <span style={{ fontSize: 14, color: '#aaa', marginTop: 10 }}>
            Total Billed Today: ${amount}
          </span>
        </DialogTitle>
        <DialogContent style={{ paddingTop: 0 }}>
          <Elements
            fonts={[{ cssSrc: 'https://fonts.googleapis.com/css?family=Roboto+Condensed' }]}
          >
            <InjectedForm />
          </Elements>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth, view }) => ({
  open: view.showPaymentModal,
  error: auth.error,
  loading: view.loading,
  userDetails: auth.userDetails,
  user: auth.user,
  productId: view.paymentDetails.productId,
  amount: view.paymentDetails.amount,
});

export default connect(
  mapStateToProps,
  {
    togglePaymentModal,
  },
)(SubscriberModal);
