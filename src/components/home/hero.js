import React, { Component } from 'react';
import styled from 'styled-components';
import {
  FlatButton,
  Header,
  PlayButton,
  ButtonText,
  ScrollDownIcon,
  AnimatedText,
} from '../common';

const Container = styled.div`
  height: none;
  padding-bottom: 100px;
  width: 100vw;
  position: relative;
  background-color: transparent;
  box-shadow: inset 420px -40px 700px 240px rgba(0, 0, 0, 0.775);
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
  font-size: 48px;
  color: #ffffff;
  opacity: 0.85;
  letter-spacing: 0.55px;
  margin-top: 0px;
  text-transform: uppercase;
  margin-bottom: 0px;
  cursor: default;
  line-height: 48px;
  @media (max-width: 600px) {
    font-size: 38px;
  }
  @media (max-width: 480px) {
    font-size: 28px;
    line-height: 28px;
  }
  @media (max-width: 800px) {
    margin-top: 0px;
  }
  @media (min-width: 801px) and (max-width: 1200px) {
    margin-top: 40px;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
    margin-top: 25px;
  }
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
    margin-top: 220px;
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
    margin-top: 10px;
  }
`;
const CourseTagline = styled.p`
  font-family: proxima-nova;
  font-weight: 700;
  font-style: black;
  font-size: 20px;
  color: #eee;
  opacity: 0.8;
  letter-spacing: 5px;
  margin-top: 10px;
  text-transform: uppercase;
  margin-bottom: 0px;
  cursor: default;
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
    margin-top: 5px;
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
`;
const GenericTagline = styled.p`
  font-family: roboto-condensed, sans-serif;
  font-weight: 400;
  font-size: 22px;
  color: #ffffff;
  opacity: 0.9;
  margin-top: 30px;
  margin-bottom: 0px;
  cursor: default;
  line-height: 30px;
  max-width: 550px;
  @media (max-width: 900px) {
    font-size: 20px;
  }
  @media (max-width: 600px) {
    font-size: 18px;
  }
  @media (max-width: 480px) {
    font-size: 15px;
    line-height: 20px;
    margin-top: 20px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 14px;
    line-height: 18px;
    margin-top: 15px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 14px;
    line-height: 18px;
    margin-top: 15px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    font-size: 13px;
    margin-top: 10px;
    line-height: 15px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 14px;
    line-height: 18px;
    margin-top: 15px;
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    font-size: 14px;
    line-height: 18px;
    margin-top: 15px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    font-size: 14px;
    line-height: 18px;
    margin-top: 15px;
  }
`;
const SubscriptionTagline = styled.p`
  font-family: adobe-caslon-pro, sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #f5f5f5;
  margin-top: 60px;
  margin-bottom: 0px;
  cursor: default;
  line-height: 30px;
  @media (max-width: 480px) {
    font-size: 16px;
    margin-top: 20px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 14px;
    margin-top: 20px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 14px;
    margin-top: 30px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 14px;
    margin-top: 20px;
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    font-size: 14px;
    margin-top: 20px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    font-size: 14px;
    margin-top: 20px;
  }
`;

const Price = styled.p`
  font-family: adobe-caslon-pro, sans-serif;
  font-weight: 600;
  font-size: 42px;
  color: #fff;
  margin-top: 25px;
  margin-bottom: 0px;
  cursor: default;
  line-height: 30px;
  max-width: 550px;
  @media (max-width: 480px) {
    font-size: 32px;
    margin-top: 10px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 32px;
    margin-top: 5px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 32px;
    margin-top: 5px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    font-size: 32px;
    margin-top: 5px;
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    font-size: 32px;
    margin-top: 5px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    font-size: 32px;
    margin-top: 5px;
  }
`;

const FeaturedCourse = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 60px;
  padding-right: 60px;
  margin-top: 50px;
  @media only screen and (min-width: 1024px) and (max-height: 1366px) {
    flex-direction: column-reverse;
  }
  @media (max-width: 600px) {
    flex-direction: column-reverse;
    margin-top: 0px;
  }
  @media (max-width: 480px) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    margin-top: 30px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    margin-top: 30px;
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
`;

const PlayButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  padding-top: 40px;
  padding-bottom: 40px;
  @media only screen and (min-width: 1024px) and (max-height: 1366px) {
    justify-content: flex-start;
  }
  @media (max-width: 600px) {
    justify-content: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
    transform: scale(0.6) translateX(-110px);
  }
  @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    padding-top: 0px;
    padding-bottom: 0px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    padding-bottom: 0px;
    padding-top: 0px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    padding-bottom: 0px;
    padding-top: 0px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    padding-bottom: 5px;
    padding-top: 10px;
    transform: scale(0.6) translateX(-92.5px);
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    padding-bottom: 0px;
    padding-top: 0px;
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    padding-bottom: 0px;
    padding-top: 0px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    padding-bottom: 0px;
    padding-top: 0px;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    padding-bottom: 30px;
    padding-top: 50px;
  }
  @media (max-width: 800px) {
    transform: scale(0.7) translateX(0px);
  }
  @media (max-width: 600px) {
    transform: scale(0.7) translateX(-55px);
  }
`;

const HeroButtons = styled.div`
  display: flex;
  margin-left: 60px;
  margin-right: 120px;
  margin-top: 22.5px;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: space-between;
    height: 95px;
  }
  @media (max-width: 480px) {
    margin-left: 40px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    margin-top: 8px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    margin-top: 8px;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    margin-top: 8px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    margin-top: 8px;
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    margin-top: 8px;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    margin-top: 8px;
  }
`;
export default class Hero extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const AnimatedTextHandler = new AnimatedText({
      targetId: 'courseTitle', // text element id
      texts: ['Metro Boomin', 'BOI-1DA', 'Southside', 'TM88'], // data array
      changeInterval: 6000, // delay between transitions (ms)
      updateInterval: 19, // transition time (ms)
      autoplay: true,
    });
    // eslint-disable-next-line no-unused-vars
    const AnimatedTextHandler2 = new AnimatedText({
      targetId: 'courseTagline', // text element id
      texts: [
        'Teaches Trap Production',
        'Teaches Trap Drums',
        'Teaches Sampling Techniques',
        'Teaches FL Studio',
      ], // data array
      changeInterval: 6000, // delay between transitions (ms)
      updateInterval: 10, // transition time (ms)
      autoplay: true,
    });
  }

  componentWillUnmount() {
    if (this.AnimatedTextHandler && this.AnimatedTextHandler2) {
      this.AnimatedTextHandler.stop();
      this.AnimatedonTextHandler2.stop();
    }
  }

  render() {
    const { showRegistrationModal, toggleTrailerModal } = this.props;
    return (
      <Container>
        {/* Header Logo, Login and Instructor Buttons */}
        <Header />
        {/* Featured Course */}
        <FeaturedCourse>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <CourseTitle id="courseTitle" className="disable-selection" />
            <CourseTagline id="courseTagline" className="disable-selection" />

            <GenericTagline className="disable-selection">
              Online courses, samples, mentoring and many other perks offered by the world's most
              talented producers.
            </GenericTagline>

            <SubscriptionTagline className="disable-selection">
              Subscriptions starting at
            </SubscriptionTagline>
            <Price className="disable-selection">$5 / monthly</Price>
          </div>
          <PlayButtonContainer>
            <PlayButton onClick={toggleTrailerModal} />
          </PlayButtonContainer>
        </FeaturedCourse>
        <HeroButtons>
          <FlatButton
            onClick={() => showRegistrationModal(true)}
            style={{ width: 200, marginRight: 20 }}
          >
            <ButtonText>Sign Up</ButtonText>
          </FlatButton>
          <FlatButton
            onClick={toggleTrailerModal}
            style={{ width: 220, backgroundColor: 'rgba(255, 255, 255, 0.275' }}
          >
            <ButtonText>Learn More</ButtonText>
          </FlatButton>
        </HeroButtons>

        <ScrollDownIcon />
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
