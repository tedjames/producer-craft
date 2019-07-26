import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { showAuthModal, logoutUser } from '../../actions';
import Logo from './logo';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-left: 60px;
  margin-right: 60px;
  padding-top: 35px;
  margin-bottom: 40px;
  position: relative;
  @media (max-width: 480px) {
    margin-left: 40px;
    margin-right: 40px;
  }
  @media (max-width: 900px) {
    margin-bottom: 0px;
  }
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    margin-bottom: 0px;
    margin-top: 0px;
  }
`;

const LoginButton = styled.p`
  font-family: proxima-nova;
  font-weight: 700;
  font-style: black;
  font-size: 14px;
  color: #eee;
  opacity: 0.95;
  letter-spacing: 5px;
  text-align: right;
  margin-top: 0px;
  margin-bottom: 0px;
  cursor: pointer;
  align-self: flex-end;
  transition: all 0.15s ease;
  min-width: 80px;
  position: absolute;
  right: 0px;
  top: 37px;
  :hover,
  :active {
    opacity: 0.45;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    font-size: 12px;
  }
`;

// eslint-disable-next-line no-shadow
const Header = ({ style, showAuthModal, logoutUser, user }) => {
  return (
    <Container style={style}>
      <Logo onClick={() => browserHistory.push('/')} />
      {user ? (
        <LoginButton className="disable-selection" onClick={() => logoutUser()}>
          LOG OUT
        </LoginButton>
      ) : (
        <LoginButton className="disable-selection" onClick={() => showAuthModal(true)}>
          LOG IN
        </LoginButton>
      )}
    </Container>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(
  mapStateToProps,
  { showAuthModal, logoutUser },
)(Header);
