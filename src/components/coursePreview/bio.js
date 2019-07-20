import React from 'react';
import styled from 'styled-components';
import { AnimatedButton } from '../common';

const BioCard = styled.div`
  height: 440px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: 75% 25%;
  background-color: #555;
  margin-top: 30px;
  box-shadow: inset 620px -40px 250px 40px rgba(0, 0, 0, 0.9);
  justify-content: center;
  padding-left: 60px;
  padding-right: 120px;
  padding-top: 100px;
  margin-top: -400px;
  @media (max-width: 600px) {
    padding-left: 40px;
    box-shadow: inset 520px -40px 250px 40px rgba(0, 0, 0, 0.85);
  }
  @media (min-width: 1100px) {
    margin-top: -520px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    margin-top: -350px;
    box-shadow: inset 620px -40px 250px 40px rgba(0, 0, 0, 0.7);
  }
`;

const BioTitle = styled.p`
  font-family: proxima-nova;
  font-weight: 700;
  font-style: black;
  font-size: 20px;
  color: #fff;
  opacity: 0.8;
  letter-spacing: 5px;
  margin-top: 60px;
  text-transform: uppercase;
  margin-bottom: 0px;
  cursor: default;
  text-align: left;
  text-shadow: 4px 4px 16px rgba(0, 0, 0, 0.85);
  @media (max-width: 900px) {
    max-width: 80vw;
    margin-top: 50px;
  }
  @media (max-width: 600px) {
    font-size: 16px;
    margin-top: 60px;
  }
  @media (max-width: 500px) {
    margin-top: 70px;
  }
  @media (max-width: 480px) {
    text-align: left;
  }
  @media (max-width: 350px) {
    margin-top: 80px;
    font-size: 14px;
    line-height: 16px;
  }
`;

const BioDescription = styled.p`
  font-family: roboto-condensed, sans-serif;
  font-weight: 400;
  font-size: 22px;
  color: #ffffff;
  opacity: 0.9;
  margin-top: 25px;
  margin-bottom: 10px;
  cursor: default;
  line-height: 30px;
  max-width: 62.5vw;
  @media (max-width: 900px) {
    max-width: 80vw;
  }
  @media (max-width: 800px) {
    max-width: 80vw;
    font-size: 20px;
    line-height: 27px;
  }
  @media (max-width: 600px) {
    max-width: 80vw;
    font-size: 18px;
    line-height: 24px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 21px;
  }
`;

const Bio = ({ backgroundImage, title, description, buttonText, onClick, to }) => {
  return (
    <BioCard backgroundImage={backgroundImage}>
      <BioTitle>{title}</BioTitle>
      <BioDescription>{description}</BioDescription>
      <AnimatedButton
        containerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
        textStyle={{ color: '#fff', alignSelf: 'flex-start' }}
        onClick={onClick}
        to={to}
      >
        {buttonText || 'READ MORE'}
      </AnimatedButton>
    </BioCard>
  );
};

export default Bio;
