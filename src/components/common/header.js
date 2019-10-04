import React, { useState } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { showAuthModal, toggleAccountModal, logoutUser } from '../../actions';
import Logo from './logo';
import MenuModal from './modals/menuModal';
import AccountModal from './modals/accountModal';

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
const Header = ({
  style,
  showAuthModal,
  logoutUser,
  user,
  toggleAccountModal,
  showAccountModal,
}) => {
  const [showMenu, toggleMenu] = useState(false);
  const handleLogout = () => {
    logoutUser();
    toggleMenu(false);
  };
  const handleCloseAccountModal = () => {
    toggleAccountModal(false);
    toggleMenu(false);
  };
  return (
    <Container style={style}>
      <Logo onClick={() => browserHistory.push('/')} />
      {user ? (
        <LoginButton className="disable-selection" onClick={() => toggleMenu(true)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e7edf1"
            strokeWidth="1.25"
            strokeOpacity="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="18" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </LoginButton>
      ) : (
        <LoginButton className="disable-selection" onClick={() => showAuthModal(true)}>
          LOG IN
        </LoginButton>
      )}
      <MenuModal
        open={showMenu}
        onClose={() => toggleMenu(false)}
        toggleAccountModal={toggleAccountModal}
        handleLogout={handleLogout}
      />
      <AccountModal
        open={showAccountModal}
        toggleMenu={() => toggleMenu(true)}
        onClose={() => handleCloseAccountModal()}
      />
    </Container>
  );
};

const mapStateToProps = ({ auth, view }) => ({
  user: auth.user,
  showAccountModal: view.showAccountModal,
});

export default connect(
  mapStateToProps,
  { showAuthModal, toggleAccountModal, logoutUser },
)(Header);
