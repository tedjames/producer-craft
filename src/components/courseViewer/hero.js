import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Header } from '../common';

const Container = styled.div`
  height: 35vh;
  width: 100vw;
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: inset 420px -40px 200px 240px rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1100px) {
    height: 32.5vh;
  }
  @media (max-width: 600px) {
    height: 30vh;
  }
  @media (max-width: 568px) {
    height: 27.5vh;
  }
  @media (max-width: 480px) {
    height: 25vh;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
    height: 45vh;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    height: 50vh;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    height: 50vh;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    height: 40vh;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
    height: 80vh;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    height: 35vh;
  }

  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    height: 80vh;
  }
  @media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    height: 30vh;
  }

  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    height: 65vh;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    height: 27.5vh;
  }
  @media only screen and (min-device-width: 411px) and (max-device-height: 823px) and (-webkit-device-pixel-ratio: 3.5) and (orientation: landscape) {
    height: 65vh;
  }
  @media only screen and (min-device-width: 411px) and (max-device-width: 731px) and (-webkit-min-device-pixel-ratio: 1) and (orientation: landscape) {
    height: 65vh;
  }
  @media only screen and (min-device-width: 411px) and (max-device-width: 731px) and (-webkit-min-device-pixel-ratio: 1) and (orientation: portrait) {
    height: 32.5vh;
  }
  background-image: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export default class Hero extends PureComponent {
  render() {
    const { backgroundImage } = this.props;
    return (
      <Container backgroundImage={backgroundImage}>
        {/* Header Logo, Login and Instructor Buttons */}
        <Header />
      </Container>
    );
  }
}
