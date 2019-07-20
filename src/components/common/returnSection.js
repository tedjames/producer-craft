import React from 'react';
import styled from 'styled-components';
import AnimatedButton from './animatedButton';

const ReturnSectionDesktop = styled.div`
  display: none;
  justify-content: flex-end;
  width: 90%;
  @media (min-width: 600px) {
    display: flex;
  }
  @media (min-width: 1450px) {
    width: 55%;
  }
  @media (min-width: 1600px) {
    width: 54.5%;
  }
  @media (min-width: 1750px) {
    width: 54%;
  }
  @media (min-width: 1900px) {
    width: 53.5%;
  }
  @media (min-width: 2000px) {
    width: 53%;
  }
`;

const ReturnSectionMobile = styled.div`
  display: none;
  justify-content: center;
  width: 100%;
  @media (max-width: 599px) {
    display: flex;
  }
`;

const ReturnSection = ({ children, onClick }) => {
  return [
    <ReturnSectionDesktop>
      <AnimatedButton
        containerStyle={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}
        to="/"
        onClick={onClick}
      >
        {children || 'Return Home'}
      </AnimatedButton>
    </ReturnSectionDesktop>,
    <ReturnSectionMobile>
      <AnimatedButton containerStyle={{}} to="/" onClick={onClick}>
        {children || 'Return Home'}
      </AnimatedButton>
    </ReturnSectionMobile>,
  ];
};

export default ReturnSection;
