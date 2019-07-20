/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
// Redux
import { connect } from 'react-redux';
import { showAuthModal, showRegistrationModal } from '../../actions';

// Components
import {
  AuthModal,
  TrailerModal,
  Footer,
  SectionTitle,
  LessonCard,
  CardList,
  MusicIcon,
  SubscribeIcon,
  ShareIcon,
  ValuePropCard,
  ValuePropositions,
  PlayButton,
  AnimatedButton,
  ReturnSection,
} from '../common';
import Hero from './hero';
import ActionBar from './actionBar';
import Recommended from './recommended';
import Bio from './bio';

// Image Assets
import HeroImage3 from '../../assets/hero-image-3.jpeg';
import HeroImage4 from '../../assets/hero-image-8.jpg';
import HeroImage5 from '../../assets/hero-image-10.png';
import HeroImage from '../../assets/hero-image-12.jpg';
import StorchHero from '../../assets/storch-hero-image.png';
import StorchHero2 from '../../assets/storch-hero-image-2.png';
import StorchHero3 from '../../assets/storch-hero-image-3.png';
import StorchHero4 from '../../assets/storch-hero-image-4.png';
import StorchHero5 from '../../assets/storch-hero-image-5.jpg';
import StorchHero6 from '../../assets/storch-hero-image-6.png';

// componentDidMount() {
//   auth().onAuthStateChanged(user => {
//     return user ? this.setState({ user }) : this.setState({ user: null });
//   });
// }

// async handleFunction() {
//   const testFunction = functions().httpsCallable('testFunction');
//   const response = await testFunction({ message: 'Howdy!' });
//   return console.log(response);
// }

const TrailerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 480px;
  width: 70%;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: 75% 25%;
  background-color: #555;
  align-self: center;
  transition: all 0.35s ease;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 2px 3px 104px -21px rgba(0, 0, 0, 0.6);
  z-index: 100;
  @media (max-width: 1100px) {
    height: 360px;
  }
  @media (max-width: 900px) {
    height: 320px;
  }
  @media (max-width: 800px) {
    height: 300px;
    width: 72.5%;
  }
  @media (max-width: 700px) {
    height: 280px;
    width: 75%;
  }
  @media (max-width: 600px) {
    height: 240px;
    width: 77.5%;
  }
  @media (max-width: 568px) {
    height: 220px;
    width: 80%;
  }
  @media (max-width: 480px) {
    height: 180px;
    width: 82.5%;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    height: 150px;
  }
`;

const TrailerContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: translateY(-330px);
  margin-bottom: -330px;
  transition: all 0.35s ease;
  @media (max-width: 1100px) {
    transform: translateY(-237.5px);
    margin-bottom: -237.5px;
  }
  @media (max-width: 600px) {
    transform: translateY(-215px);
    margin-bottom: -215px;
  }
  @media (max-width: 568px) {
    transform: translateY(-200px);
    margin-bottom: -200px;
  }
  @media (max-width: 480px) {
    transform: translateY(-200px);
    margin-bottom: -200px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    transform: translateY(-160px);
    margin-bottom: -160px;
  }
`;

class CourseDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTrailerModal: false,
    };
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { showRegistrationModal } = this.props;
    const { showTrailerModal } = this.state;
    return (
      <div style={{ overflowX: 'hidden' }}>
        {/* Hero Image, Title and Enroll/Follow Buttons */}
        <Hero
          name="Scott Storch"
          tagline="Teaches Music Production"
          showRegistrationModal={showRegistrationModal}
          showTrailerModal={() => this.setState({ showTrailerModal: true })}
        />

        <div
          style={{
            background: '#eee',
            paddingTop: 40,
            paddingBottom: 30,
          }}
        >
          {/* Floating Trailer Card */}
          <TrailerContainer>
            <TrailerCard
              onClick={() => this.setState({ showTrailerModal: true })}
              backgroundImage={StorchHero4}
            >
              <PlayButton />
            </TrailerCard>
          </TrailerContainer>

          {/* Instructor Bio */}
          <Bio
            title="Experience the legend"
            description="8x Grammy award winning producer Scott Storch teaches music production based on his
        experience working with artists including, Dr. Dre, Eminem, Timbaland, Justin Timberlake, 50
        Cent, The Game, Christina Aguilera, Beyoncé, Nas, Snoop Dogg, A$AP Ferg and many more."
            buttonText="Read more on Genius.com"
            backgroundImage={StorchHero2}
            onClick={() => window.open('https://genius.com/artists/Scott-storch', '_blank')}
            to="https://genius.com/artists/Scott-storch"
          />

          {/* Value Propositions */}
          <ValuePropositions style={{ paddingTop: 0 }}>
            <ValuePropCard
              icon={<MusicIcon />}
              title="22 Lessons"
              description="Experience a glimpse into the world of Scott Storch where he breaks down some of his greatest hits and teaches what he's learned along the way"
            />
            <ValuePropCard
              icon={<SubscribeIcon />}
              title="Sample Packs"
              description="Subscribers gain access to an exclusive sample pack with over 40 drum hits, 20 percussion loops and 12 melodic loops."
            />
            <ValuePropCard
              icon={<ShareIcon />}
              title="Competition"
              description="Share your musical works with the community and compete for a chance to work with the legend himself"
              style={{ borderRight: '0px', borderBottom: '0px' }}
            />
          </ValuePropositions>

          {/* Lesson Plan */}
          <SectionTitle>Lesson Plan</SectionTitle>
          <CardList>
            <LessonCard backgroundImage={HeroImage4} title="1" tagline="Welcome to the studio" />
            <LessonCard backgroundImage={HeroImage5} title="2" tagline="Setting the vibe" />
            <LessonCard backgroundImage={HeroImage} title="3" tagline="Sound selection" />
            <LessonCard backgroundImage={HeroImage3} title="4" tagline="Drumming" />
            <LessonCard backgroundImage={HeroImage4} title="5" tagline="Welcome to the studio" />
            <LessonCard backgroundImage={HeroImage5} title="6" tagline="Setting the vibe" />
            <LessonCard backgroundImage={HeroImage} title="7" tagline="Sound selection" />
            <LessonCard backgroundImage={HeroImage3} title="8" tagline="Drumming" />
            <LessonCard backgroundImage={HeroImage4} title="9" tagline="Welcome to the studio" />
            <LessonCard backgroundImage={HeroImage5} title="10" tagline="Setting the vibe" />
            <LessonCard backgroundImage={HeroImage} title="11" tagline="Sound selection" />
            <LessonCard backgroundImage={HeroImage3} title="12" tagline="Drumming" />
          </CardList>

          {/*  Action Bar: (Purchase Course, Follow, Social Media, View Profile) */}
          <ActionBar
            showRegistrationModal={() => showRegistrationModal(true)}
            showTrailerModal={() => this.setState({ showTrailerModal: true })}
          />

          {/* Recommended Courses */}
          <Recommended />

          {/* Return Home Button */}
          <ReturnSection />
        </div>
        <Footer />

        {/* Modals */}
        <AuthModal />
        <TrailerModal
          open={showTrailerModal}
          close={() => this.setState({ showTrailerModal: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  email: state.auth.email,
  password: state.auth.password,
  confirmPassword: state.auth.confirmPassword,
  error: state.auth.error,
  loading: state.auth.loading,
  showModal: state.auth.showModal,
});

export default connect(
  mapStateToProps,
  { showAuthModal, showRegistrationModal },
)(CourseDetails);
