/*
Higher order component for handling authenticated routes
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default ComposedComponent => {
  class RequireAdmin extends Component {
    componentWillMount() {
      return this.props.user.isAdmin ? null : browserHistory.push('/dashboard');
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ dashboard }) => ({
    user: dashboard.user,
  });

  // Wrap our HOC within the react-redux connect HOC to obtain redux store data with mapStateToProps
  return connect(
    mapStateToProps,
    {},
  )(RequireAdmin);
};
