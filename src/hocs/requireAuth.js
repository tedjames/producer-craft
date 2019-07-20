/*
Higher order component for handling authenticated routes
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { auth } from 'firebase';
import { authenticate, unauthenticate } from '../actions';

export default ComposedComponent => {
  class Authentication extends Component {
    constructor(props) {
      super(props);
      this.handleRedirect = this.handleRedirect.bind(this);
    }

    // Authentication Handler + Firebase Listener
    componentWillMount() {
      // Firebase authentication listener
      auth().onAuthStateChanged(user => {
        user ? this.props.authenticate(user) : this.handleRedirect();
      });
    }

    handleRedirect() {
      this.props.unauthenticate();
      browserHistory.push('/login');
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  // Wrap our HOC within the react-redux connect HOC to obtain redux store data with mapStateToProps
  return connect(
    null,
    { authenticate, unauthenticate },
  )(Authentication);
};
