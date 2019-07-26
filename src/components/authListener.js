import { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import { authenticate, unauthenticate } from '../actions';

class AuthListener extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const { authenticate, unauthenticate } = this.props;
    auth().onAuthStateChanged(user => {
      return user ? authenticate(user) : unauthenticate();
    });
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default connect(
  null,
  { authenticate, unauthenticate },
)(AuthListener);
