import React from 'react';
import styled from 'styled-components';
import { browserHistory } from 'react-router';

const Card = styled.div`
  height: 160px;
  width: 320px;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: 75% 25%;
  background-color: #555;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  border-radius: 5px;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 40px;
  box-shadow: inset 280px -40px 70px 140px rgba(0, 0, 0, 0.7);
  transition: all 0.35s ease;
  cursor: pointer;
  opacity: 0.96;
  @media (min-width: 1290px) {
    flex: 0 44%;
    margin: 5px;
    height: 360px;
  }
  @media (max-width: 1289px) {
    height: 300px;
    width: 100%;
    margin-bottom: 17.5px;
    border-radius: 15px;
    padding-left: 120px;
    padding-bottom: 30px;
    padding-right: 80px;
  }
  @media (max-width: 900px) {
    width: 98%;
  }
  @media (max-width: 480px) {
    height: 240px;
  }
  :hover {
    box-shadow: inset 340px -40px 70px 140px rgba(0, 0, 0, 0.8);
  }
  :active {
    opacity: 0.85;
  }
`;

const PreviewTitle = styled.p`
  font-family: proxima-nova;
  font-weight: 800;
  font-style: black;
  font-size: 24px;
  color: #fff;
  opacity: 0.88;
  letter-spacing: 0.65px;
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 0px;
  line-height: 20px;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0px;
  }
  @media (max-width: 600px) {
    font-size: 18px;
    margin-top: 0px;
  }
  @media (max-width: 900px) {
    font-size: 22px;
  }
`;
const PreviewTagline = styled.p`
  font-family: proxima-nova;
  font-weight: 700;
  font-style: black;
  font-size: 12px;
  color: #eee;
  opacity: 0.8;
  letter-spacing: 5px;
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 0px;
  cursor: pointer;
  @media (max-width: 480px) {
    max-width: 280px;
  }
`;

const MiniCard = styled.div`
  height: 160px;
  width: 320px;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: 70% 30%;
  background-color: #555;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  border-radius: 5px;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 40px;
  margin-left: 25px;
  margin-right: 25px;
  box-shadow: inset 280px -40px 70px 140px rgba(0, 0, 0, 0.65);
  opacity: 0.95;
  transition: all 0.35s ease;
  cursor: pointer;
  @media (max-width: 1400px) {
    height: 150px;
    width: 300px;
  }
  @media (max-width: 1300px) {
    height: 130px;
    width: 280px;
  }
  @media (max-width: 1240px) {
    height: 120px;
    width: 267.5px;
  }
  @media (max-width: 1200px) {
    height: 180px;
    width: 100%;
    margin-bottom: 17.5px;
    border-radius: 15px;
    padding-left: 120px;
    padding-bottom: 30px;
    padding-right: 80px;
  }
  @media (max-width: 900px) {
    width: 98%;
  }
  @media (max-width: 480px) {
    height: 160px;
    box-shadow: inset 180px -40px 70px 140px rgba(0, 0, 0, 0.7);
  }
  :hover {
    box-shadow: inset 340px -40px 70px 140px rgba(0, 0, 0, 0.8);
  }
  :active {
    opacity: 0.9;
  }
`;

const CourseCard = ({ backgroundImage, title, tagline, disabled, mini }) => {
  return mini ? (
    <MiniCard
      backgroundImage={backgroundImage}
      title={title}
      tagline={tagline}
      style={disabled && { opacity: 0.45, cursor: 'default' }}
      onClick={() => browserHistory.push('/preview/scott-storch-teaches-music-production')}
    >
      <PreviewTitle className="disable-selection">{title}</PreviewTitle>
      <PreviewTagline className="disable-selection">{tagline}</PreviewTagline>
    </MiniCard>
  ) : (
    <Card
      backgroundImage={backgroundImage}
      title={title}
      tagline={tagline}
      style={disabled && { opacity: 0.45, cursor: 'default' }}
      onClick={() => browserHistory.push('/preview/scott-storch-teaches-music-production')}
    >
      <PreviewTitle style={disabled && { cursor: 'default' }} className="disable-selection">
        {title}
      </PreviewTitle>
      <PreviewTagline style={disabled && { cursor: 'default' }} className="disable-selection">
        {tagline}
      </PreviewTagline>
    </Card>
  );
};

export default CourseCard;
