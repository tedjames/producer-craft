import React from 'react';
import styled from 'styled-components';
import { AnimatedButton, FlatButton, ButtonText } from '../common';

const BioCard = styled.div`
  width: 100vw;
  padding-bottom: 60px;
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
  padding-right: 120px;
  margin-top: -400px;
  @media (min-width: 1100px) {
    margin-top: -520px;
  }
  @media (max-width: 900px) {
    margin-top: -360px;
  }
  @media (max-width: 800px) {
    margin-top: -340px;
  }
  @media (max-width: 700px) {
    margin-top: -320px;
  }
  @media (max-width: 600px) {
    box-shadow: inset 520px -40px 250px 40px rgba(0, 0, 0, 0.85);
    margin-top: -280px;
  }
  @media (max-width: 568px) {
    margin-top: -260px;
  }
  @media (max-width: 480px) {
    margin-top: -220px;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    margin-top: -200px;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    margin-top: -200px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    margin-top: -200px;
  }
`;

const BioTagline = styled.p`
  font-family: proxima-nova;
  font-weight: 700;
  font-style: black;
  font-size: 20px;
  color: #fff;
  opacity: 0.8;
  letter-spacing: 5px;
  margin-top: 0px;
  text-transform: uppercase;
  margin-bottom: 0px;
  cursor: default;
  text-align: left;
  text-shadow: 4px 4px 16px rgba(0, 0, 0, 0.85);
  padding-left: 60px;
  @media (max-width: 900px) {
    max-width: 80vw;
  }
  @media (max-width: 600px) {
    font-size: 16px;
  }
  @media (max-width: 500px) {
  }
  @media (max-width: 480px) {
    text-align: left;
  }
  @media (max-width: 350px) {
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
  padding-left: 60px;
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
const Name = styled.p`
  font-family: proxima-nova;
  font-weight: 800;
  font-style: black;
  font-size: 42px;
  color: #ffffff;
  opacity: 0.2;
  letter-spacing: 0.65px;
  margin-top: 1vh;
  text-transform: uppercase;
  margin-bottom: -15px;
  cursor: default;
  line-height: 34px;
  text-align: left;
  padding-left: 60px;
  @media (max-width: 600px) {
    font-size: 38px;
    line-height: 34px;
  }
  @media (max-width: 480px) {
    font-size: 28px;
    line-height: 26px;
  }
  @media (max-width: 360px) {
    font-size: 22px;
    line-height: 20px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 28px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 28px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    font-size: 24px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 28px;
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    font-size: 28px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    font-size: 28px;
  }

  @media (max-height: 860px) {
    font-size: 32px;
  }

  @media (max-height: 730px) {
    font-size: 24px;
    line-height: 22px;
  }
`;

const Bio = ({ backgroundImage, name, title, description, buttonText, onClick }) => {
  return (
    <BioCard backgroundImage={backgroundImage}>
      <Name className="disable-selection">{name}</Name>
      <BioTagline>{title}</BioTagline>
      <BioDescription>{description}</BioDescription>
      <AnimatedButton
        containerStyle={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingLeft: 122,
        }}
        textStyle={{ color: '#fff', alignSelf: 'flex-start' }}
        onClick={onClick}
      >
        {buttonText || 'READ MORE'}
      </AnimatedButton>
    </BioCard>
  );
};

export default Bio;
