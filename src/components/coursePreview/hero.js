import React, { PureComponent } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import { FlatButton, Header, ButtonText } from '../common';

const Container = styled.div`
  height: 70vh;
  width: 100vw;
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: inset 420px -40px 200px 240px rgba(0, 0, 0, 0.85);
  @media (max-width: 1100px) {
    height: 60vh;
  }
  @media (max-width: 600px) {
    height: 52.5vh;
  }
  @media (max-width: 568px) {
    height: 50vh;
  }
  @media (max-width: 480px) {
    height: 45vh;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
    height: 75vh;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    height: 80vh;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    height: 80vh;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    height: 67.5vh;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    height: 80vh;
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    height: 80vh;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    height: 80vh;
  }
  @media screen and (device-width: 412px) and (device-height: 823px) and (-webkit-device-pixel-ratio: 3.5) and (orientation: landscape) {
    height: 140vh !important;
  }
  @media only screen and (min-device-width: 411px) and (max-device-width: 731px) and (-webkit-min-device-pixel-ratio: 1) and (orientation: landscape) {
    height: 75vh;
  }
  background-image: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const BackgroundImage = styled.span`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const CourseTitle = styled.p`
  font-family: proxima-nova;
  font-weight: 800;
  font-style: black;
  font-size: 54px;
  color: #ffffff;
  opacity: 0.2;
  letter-spacing: 0.65px;
  margin-top: 1vh;
  text-transform: uppercase;
  margin-bottom: -15px;
  cursor: default;
  line-height: 48px;
  text-align: center;
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
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
    margin-top: 30px;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
    margin-top: 30px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    margin-top: 40px;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    margin-top: 120px;
  }

  @media only screen and (min-device-width: 1024px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
    margin-top: 200px;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    margin-top: 180px;
  }
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
    margin-top: 90px;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    margin-top: 80px;
  }
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    margin-top: 100px;
  }

  @media (max-height: 860px) {
    font-size: 32px;
  }

  @media (max-height: 730px) {
    font-size: 24px;
    line-height: 22px;
    margin-bottom: 0px;
  }
`;
const CourseTagline = styled.p`
  font-family: proxima-nova;
  font-weight: 700;
  font-style: black;
  font-size: 20px;
  color: #f5f5f5;
  opacity: 0.8;
  letter-spacing: 5px;
  margin-top: 10px;
  text-transform: uppercase;
  margin-bottom: 0px;
  cursor: default;
  text-align: center;
  padding: 7.5px;
  padding-right: 10px;
  padding-left: 10px;
  text-shadow: 4px 4px 16px rgba(0, 0, 0, 0.77);
  @media (max-width: 480px) {
    font-size: 12px;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 14px;
    letter-spacing: 4.2px;
    margin-top: 0px;
    position: relative;
    bottom: 3px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 14px;
    letter-spacing: 4.2px;
    margin-top: 0px;
    position: relative;
    bottom: 3px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    font-size: 12px;
    margin-top: 10px;
    line-height: 15px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 14px;
    letter-spacing: 4.2px;
    margin-top: 0px;
    position: relative;
    bottom: 3px;
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    font-size: 14px;
    letter-spacing: 4.2px;
    margin-top: 0px;
    position: relative;
    bottom: 3px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    font-size: 14px;
    letter-spacing: 4.2px;
    margin-top: 0px;
    position: relative;
    bottom: 3px;
  }
  @media (max-height: 730px) {
    margin-top: 0px;
  }
`;

const FeaturedCourse = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 60px;
  padding-right: 60px;
  margin-top: 90px;
  justify-content: center;
  @media only screen and (min-width: 1024px) and (max-height: 1366px) {
    flex-direction: column-reverse;
  }
  @media (max-width: 600px) {
    flex-direction: column-reverse;
    margin-top: 40px;
  }
  @media (max-width: 480px) {
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 85px;
  }
  @media (max-height: 900px) {
    margin-top: 2vh;
  }
  @media (min-width: 481px) and (min-height: 1000px) {
    margin-top: 120px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    margin-top: 0px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    margin-top: 30px;
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    margin-top: 100px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    margin-top: 30px;
  }
  @media only screen and (min-device-width: 411px) and (max-device-width: 731px) and (-webkit-min-device-pixel-ratio: 1) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (min-device-width: 411px) and (max-device-width: 823px) and (-webkit-min-device-pixel-ratio: 1) and (orientation: portrait) {
    margin-top: 80px;
  }
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 1) and (orientation: portrait) {
    margin-top: 80px;
  }
  @media only screen and (min-device-width: 360px) and (max-device-width: 640px) and (-webkit-min-device-pixel-ratio: 1) and (orientation: portrait) {
    margin-top: 40px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 22.5px;
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    display: none;
  }
  @media only screen and (min-device-width: 411px) and (max-device-width: 731px) and (-webkit-min-device-pixel-ratio: 1) and (orientation: landscape) {
    display: none;
  }
  @media (max-height: 835px) {
    margin-top: 5px;
  }
  @media (max-width: 600px) {
    margin-top: 12.5px;
  }
  @media only screen and (min-device-width: 360px) and (max-device-width: 640px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    transform: scale(0.9);
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    transform: scale(0.9);
  }
`;

export default class Hero extends PureComponent {
  render() {
    const { showRegistrationModal, name, tagline, handleEnroll, user, course } = this.props;
    return (
      <Container backgroundImage={course.coverImage}>
        {/* Header Logo, Login and Instructor Buttons */}
        <Header />
        {/* Featured Course */}
        <FeaturedCourse>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CourseTitle className="disable-selection">{name}</CourseTitle>
            <CourseTagline className="disable-selection">{tagline}</CourseTagline>
          </div>
        </FeaturedCourse>
        <HeroButtons>
          <FlatButton
            onClick={() => (user ? handleEnroll() : showRegistrationModal(true))}
            style={{ width: 180, marginRight: 10 }}
          >
            <ButtonText>Enroll</ButtonText>
          </FlatButton>
          <FlatButton
            onClick={() => browserHistory.push(`/courses/${course.urlSlug}/1`)}
            style={{ width: 180, backgroundColor: 'rgba(255, 255, 255, 0.125' }}
          >
            <ButtonText>Preview</ButtonText>
          </FlatButton>
        </HeroButtons>
        <div className="cb-slideshow">
          <li>
            <BackgroundImage />
          </li>

          <li>
            <BackgroundImage />
          </li>

          <li>
            <BackgroundImage />
          </li>
          <li>
            <BackgroundImage />
          </li>
        </div>
      </Container>
    );
  }
}
