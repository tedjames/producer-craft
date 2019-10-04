/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';

const ButtonText = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 900;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #555;
  opacity: 0.75;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  top: 5px;
  background: -webkit-linear-gradient(#888, #333);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Button = styled.div`
  display: flex;
  position: relative;
  margin-top: 10px;
  margin-bottom: 5px;
  justify-content: center;
  cursor: pointer;
  transition: 0.1s all ease;
  min-height: 40px;
  max-width: 400px;
  align-items: center;
  align-self: center;
  :hover {
    opacity: 0.9;
  }
  &:hover .designArrow {
    transform: scaleX(1.25) translateX(15px);
  }
  &:hover .designTriangle {
    transform: rotate(90deg) scale(0.3) scaleY(0.8) translateY(30px);
  }
  &:hover .designBox {
    transform: rotate(45deg) scale(0.35);
    opacity: 0.25;
  }
  &:hover ${ButtonText} {
    opacity: 0.4;
    transform: translateX(-3px);
  }
  text-decoration: none;
`;

const Container = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const AnimatedButton = ({ children, containerStyle, textStyle, to, onClick }) => {
  return (
    <Container
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...containerStyle }}
    >
      <Button onClick={!onClick ? () => browserHistory.push(to || '/') : onClick}>
        <div
          style={{
            display: 'flex',
            position: 'relative',
            top: 10,
            marginRight: 5,
          }}
        >
          <svg
            style={{
              zIndex: '10',
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#bebebe"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-arrow-right designArrow"
          >
            <line x1="4" y1="12" x2="19" y2="12" />
            <polyline points="12 5" />
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#bebebe"
            className="feather feather-triangle designTriangle"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            stroke="#7e7e7e"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-square designBox"
            strokeDasharray="3 3 3 3"
          >
            <rect x="3" y="3" width="18" height="18" rx="1" ry="1" />
          </svg>
        </div>
        <div>
          <a
            href={to}
            className="disable-selection"
            style={{
              fontFamily: 'proxima-nova, sans-serif',
              fontWeight: 800,
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: 5,
              color: '#555',
              opacity: 0.75,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              top: 5,
              textDecoration: 'none',
              ...textStyle,
            }}
          >
            {children}
          </a>
        </div>
      </Button>
    </Container>
  );
};

export default AnimatedButton;
