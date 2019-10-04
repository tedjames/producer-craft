import React from 'react';
import { browserHistory } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import styled, { keyframes } from 'styled-components';
import { RemoveScroll } from 'react-remove-scroll';

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
  width: 100%;
  height: 92.5vh;
  z-index: 10;
  overflow: hidden;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b4b4b4' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FooterMenuTitle = styled.p`
  font-family: proxima-nova, sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: #888;
  opacity: 0.65;
  letter-spacing: 4.2px;
  text-transform: uppercase;
  cursor: default;
  padding-top: 0px;
  padding-bottom: 10px;
  margin-top: 3px;
  @media (max-width: 1400px) {
    margin-top: 40px;
    padding-bottom: 0px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    display: none;
  }
`;
const FooterMenuItem = styled.a`
  font-family: proxima-nova, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #eee;
  opacity: 0.65;
  letter-spacing: 4.2px;
  text-transform: uppercase;
  text-decoration: none;
  cursor: default;
  padding-top: 30px;
  padding-bottom: 5px;
  :hover,
  :active {
    opacity: 0.3;
  }
  cursor: pointer;
  max-width: 260px;
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    margin: 12.5px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    margin: 12.5px;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    margin: 12.5px;
  }
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    margin: 12.5px;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    margin: 12.5px;
  }
`;

const LandscapeClose = styled.div`
  display: none;
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: flex;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: flex;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: flex;
  }
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    display: flex;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    display: flex;
  }
`;
const PortraitClose = styled.div`
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    display: none;
  }
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    flex-direction: row;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    flex-direction: row;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    flex-direction: row;
  }
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    flex-direction: row;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    flex-direction: row;
  }
`;
const MenuModal = ({ open, onClose, handleLogout, toggleAccountModal }) => {
  const handleRouteChange = route => {
    browserHistory.push(route);
    return onClose();
  };
  const handleMyAccount = () => {
    toggleAccountModal(true);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      style={{ background: 'transparent' }}
      fullScreen
      id="menu-modal"
    >
      <DialogContent style={{ margin: 0, padding: 0 }}>
        <Container>
          <LandscapeClose>
            <svg
              onClick={onClose}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f5f5f5"
              strokeOpacity="0.8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
              style={{ position: 'relative', top: 0 }}
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </LandscapeClose>
          <MenuItems>
            <PortraitClose>
              <svg
                onClick={onClose}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f5f5f5"
                strokeOpacity="0.8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
                style={{ position: 'relative', top: 0 }}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </PortraitClose>
            <FooterMenuTitle className="disable-selection">MENU</FooterMenuTitle>
            <FooterMenuItem className="disable-selection" onClick={() => handleRouteChange('/')}>
              HOME
            </FooterMenuItem>
            <FooterMenuItem
              className="disable-selection"
              onClick={() => handleRouteChange('/#my-classes')}
            >
              CLASSES
            </FooterMenuItem>
            <FooterMenuItem className="disable-selection" onClick={handleMyAccount}>
              MY ACCOUNT
            </FooterMenuItem>
            <FooterMenuItem className="disable-selection" onClick={() => handleRouteChange('/')}>
              SUPPORT
            </FooterMenuItem>
            <FooterMenuItem className="disable-selection" onClick={() => handleRouteChange('/')}>
              BLOG
            </FooterMenuItem>
            <FooterMenuItem className="disable-selection" onClick={handleLogout}>
              LOG OUT
            </FooterMenuItem>
          </MenuItems>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default MenuModal;
