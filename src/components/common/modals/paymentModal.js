/* eslint-disable react/no-multi-comp */
/* eslint-disable no-shadow */
import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { injectStripe, Elements } from 'react-stripe-elements';
import { functions } from 'firebase';
import Swal from 'sweetalert2';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { togglePaymentModal, togglePaymentLoading } from '../../../actions';

import PaymentForm from './paymentForm';

const ProductName = styled.span`
  background: -webkit-linear-gradient(#888, #333);
  color: #888;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

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

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
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

    // Verify that first and last names have been provided
    if (!firstName || !lastName) {
      return this.handleError('Please include a first and last name');
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
    // Handle source creation errors
    if (error) {
      console.log('Error creating source: ', error);
      this.setState({ loading: false });
      return this.handleError(`${error.message}`);
    }

    if (productId) {
      // Single course purchase if product ID is present
      // Send charge to cloud function
      console.log('Sending source to cloud function...');
      const stripeAmount = amount.split('.').join('');
      try {
        // Create strip charge
        const stripeCreateCharge = functions().httpsCallable('stripeCreateCharge');
        const res = await stripeCreateCharge({
          source: source.id,
          amount: stripeAmount,
          product_id: productId,
          firstName,
          lastName,
        });
        togglePaymentModal(false);
        Swal.fire({
          customClass: {
            container: 'my-swal',
          },
          title: 'Payment Success',
          text: 'Taking you to your class now!',
          type: 'success',
          confirmButtonText: 'Continue',
          timer: 8000,
          onClose: () => {
            browserHistory.push('/courses/scott-storch-teaches-music-production#course-viewer');
          },
        });
        // Remove loading indicator
        this.setState({ loading: false });
        return console.log('Customer charge was successful: ', res);
      } catch (error) {
        console.log('Error: ', error);
        return this.handleError('Error encountered. Please try again.');
      }
    }

    // Subscriptions
    // Create charge for specified amount
    console.log('Creating subscription...');
    const stripeCreateSubscription = functions().httpsCallable('stripeCreateSubscription');
    const res = await stripeCreateSubscription({
      plan: 'plan_FW6JkaZ4V59Q1e',
      source: source.id,
      firstName,
      lastName,
    });
    // Remove loading indicator
    this.setState({ loading: false });
    togglePaymentModal(false);
    Swal.fire({
      customClass: {
        container: 'my-swal',
      },
      title: 'Payment Success',
      text:
        'Welcome to Producer Craft, a community of like-minded producers who strive to master their craft and learn from some of the greatest talent in the world. You now have access to all of our content, perks and sample packs!',
      type: 'success',
      confirmButtonText: 'Continue',
      onClose: () => {
        browserHistory.push('/#my-classes');
      },
    });

    return console.log('Subscription created: ', res);
  }

  render() {
    const { firstName, lastName, loading, error } = this.state;
    return (
      <PaymentForm
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

class PaymentModal extends PureComponent {
  render() {
    // eslint-disable-next-line no-shadow
    const { open, togglePaymentModal, amount, productName, productId, subscription } = this.props;
    return (
      <Dialog
        open={open}
        onClose={() => togglePaymentModal(false)}
        aria-labelledby="form-dialog-title"
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        id="PaymentModal"
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
          <ProductName style={{ fontWeight: '800' }}>{productName}</ProductName>
          <span style={{ fontSize: 14, color: '#aaa', marginTop: 10 }}>
            Total Billed Today: ${amount}
          </span>
        </DialogTitle>
        <DialogContent style={{ paddingTop: 0 }}>
          <Elements
            fonts={[{ cssSrc: 'https://fonts.googleapis.com/css?family=Roboto+Condensed' }]}
          >
            <InjectedForm
              amount={amount}
              productId={productId}
              subscription={subscription}
              togglePaymentModal={togglePaymentModal}
            />
          </Elements>
        </DialogContent>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth, view }) => ({
  open: view.showPaymentModal,
  error: auth.error,
  loading: view.paymentLoading,
  userDetails: auth.userDetails,
  user: auth.user,
  productId: view.paymentDetails.productId,
  amount: view.paymentDetails.amount,
  productName: view.paymentDetails.productName,
  subscription: view.paymentDetails.subscription,
});

export default connect(
  mapStateToProps,
  {
    togglePaymentModal,
    togglePaymentLoading,
  },
)(PaymentModal);
