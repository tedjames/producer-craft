/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showAuthModal, showRegistrationModal } from '../../actions';
import {
  AuthModal,
  TrailerModal,
  Footer,
  HorizontalScrollView,
  InstructorCard,
  SectionTitle,
  CourseCard,
  CardList,
  MusicIcon,
  SubscribeIcon,
  ShareIcon,
  ValuePropCard,
  ValuePropositions,
} from '../common';

// Components
import Hero from './hero';

// Image Assets
import HeroImage3 from '../../assets/hero-image-3.jpeg';
import HeroImage4 from '../../assets/hero-image-8.jpg';
import HeroImage5 from '../../assets/hero-image-10.png';
import HeroImage from '../../assets/hero-image-12.jpg';

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

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTrailerModal: false,
      showFloatingButton: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (document.documentElement.scrollTop > 1024 || document.body.scrollTop > 1024) {
        this.setState({ showFloatingButton: true });
      } else {
        this.setState({ showFloatingButton: false });
      }
    }, 1000);
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { showRegistrationModal } = this.props;
    const { showTrailerModal, showFloatingButton } = this.state;
    return (
      <div style={{ overflowX: 'hidden' }}>
        {/* Animated Hero Image and Featured Courses */}
        <Hero
          showRegistrationModal={showRegistrationModal}
          toggleTrailerModal={() => this.setState({ showTrailerModal: !showTrailerModal })}
        />

        {/* Recently Added Courses */}
        <div style={{ background: '#fff', paddingTop: 40 }}>
          <SectionTitle style={{ marginTop: 0 }}>Recently Added</SectionTitle>
          <CardList mini>
            <CourseCard
              backgroundImage={HeroImage3}
              title="BOI-1DA"
              tagline="Teaches Drumming"
              mini
            />
            <CourseCard
              backgroundImage={HeroImage4}
              title="Southside"
              tagline="Teaches Trap Production"
              mini
            />
            <CourseCard
              backgroundImage={HeroImage5}
              title="London on da track"
              tagline="Teaches FL Studio"
              mini
            />
            <CourseCard
              backgroundImage={HeroImage}
              title="London on da track"
              tagline="Teaches FL Studio"
              mini
            />
          </CardList>

          {/* Value Propositions */}
          <ValuePropositions>
            <ValuePropCard
              icon={<MusicIcon />}
              title="Learn"
              description="Enroll in courses taught by world-class producers, sound engineers and music
                  artists."
            />
            <ValuePropCard
              icon={<SubscribeIcon />}
              title="Subscribe"
              description="Support your favorite producers and gain early-access to courses, sample packs and
                  more."
            />
            <ValuePropCard
              icon={<ShareIcon />}
              title="Engage"
              description="Share your musical works with peers and instructors for constructive feedback."
              style={{ borderRight: '0px', borderBottom: '0px' }}
            />
          </ValuePropositions>

          {/* Instructors */}
          <SectionTitle>Instructors</SectionTitle>
          <HorizontalScrollView>
            <InstructorCard backgroundImage={HeroImage3} name="BOI-1DA" />
            <InstructorCard backgroundImage={HeroImage4} name="Southside" />
            <InstructorCard backgroundImage={HeroImage5} name="London on da track" />
            <InstructorCard backgroundImage={HeroImage3} name="BOI-1DA" />
            <InstructorCard backgroundImage={HeroImage4} name="Southside" />
            <InstructorCard backgroundImage={HeroImage5} name="London on da track" />
            <InstructorCard backgroundImage={HeroImage5} name="London on da track" />
            <InstructorCard backgroundImage={HeroImage5} name="London on da track" />
          </HorizontalScrollView>

          {/* Available Courses */}
          <SectionTitle>Available Courses</SectionTitle>
          <CardList>
            <CourseCard backgroundImage={HeroImage3} title="BOI-1DA" tagline="Teaches Drumming" />

            <CourseCard
              backgroundImage={HeroImage4}
              title="Southside"
              tagline="Teaches Trap Production"
            />
            <CourseCard
              backgroundImage={HeroImage5}
              title="London on da track"
              tagline="Teaches FL Studio"
            />
            <CourseCard
              backgroundImage={HeroImage}
              title="London on da track"
              tagline="Teaches FL Studio"
            />
          </CardList>

          {/* Coming Soon */}
          <SectionTitle>Coming Soon</SectionTitle>
          <CardList style={{ paddingBottom: 80 }}>
            <CourseCard
              backgroundImage={HeroImage4}
              title="Southside"
              tagline="Teaches Trap Production"
              disabled
            />
            <CourseCard
              backgroundImage={HeroImage5}
              title="London on da track"
              tagline="Teaches FL Studio"
              disabled
            />
            <CourseCard
              backgroundImage={HeroImage}
              title="London on da track"
              tagline="Teaches FL Studio"
              disabled
            />
          </CardList>
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
)(Home);
