import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.p`
  font-family: proxima-nova;
  font-weight: 900;
  font-style: black;
  font-size: 18px;
  color: #bebebe;
  letter-spacing: 5px;
  margin-top: 0px;
  margin-bottom: 0px;
  opacity: 0.45;
  cursor: default;
  text-transform: uppercase;
  @media (max-width: 600px) {
    max-width: 200px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    font-size: 14px;
  }
`;

const Logo = ({ style, onClick }) => (
  <LogoContainer
    style={onClick && { cursor: 'pointer', ...style }}
    onClick={onClick}
    className="disable-selection"
  >
    Producer
    <br />
    Craft
  </LogoContainer>
);

export default Logo;
