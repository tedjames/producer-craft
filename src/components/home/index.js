/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  showAuthModal,
  showRegistrationModal,
  toggleSubscribeModal,
  toggleAddCourseModal,
  fetchCourses,
} from '../../actions';
import {
  AuthModal,
  TrailerModal,
  Footer,
  SectionTitle,
  CourseCard,
  CardList,
  MusicIcon,
  SubscribeIcon,
  ShareIcon,
  ValuePropCard,
  ValuePropositions,
  FlatButton,
  ButtonText,
  SubscribeModal,
  PaymentModal,
  AddCourseModal,
} from '../common';

// Components
import Hero from './hero';

// Images for "Coming Soon" Section
import HeroImage4 from '../../assets/hero-image-8.jpg';
import HeroImage5 from '../../assets/hero-image-10.png';
import HeroImage from '../../assets/hero-image-12.jpg';

const FloatingActionBar = styled.div`
  position: fixed;
  top: 0px;
  transform: ${props => (props.show ? 'translateY(0px)' : 'translateY(-80px)')};
  z-index: 100;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  box-shadow: 2px 2px 66px -35px rgba(0, 0, 0, 0.75);
  background-color: #f4f4f4;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dfdfdf' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  transition: all 0.35s ease;
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.scrollListener = this.scrollListener.bind(this);

    this.state = {
      showTrailerModal: false,
      showFloatingActionBar: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener);
    const { fetchCourses, courses } = this.props;
    return !courses && fetchCourses();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  // async handleFunction() {
  //   const testFunction = functions().httpsCallable('testFunction');
  //   const response = await testFunction({ message: 'Howdy!' });
  //   return console.log(response);
  // }

  scrollListener() {
    if (window.scrollY >= 800) {
      return window.scrollY >= document.getElementById('footer').offsetTop
        ? this.setState({ showFloatingActionBar: false })
        : this.setState({ showFloatingActionBar: true });
    }
    return this.setState({ showFloatingActionBar: false });
  }

  render() {
    // eslint-disable-next-line no-shadow
    const {
      showRegistrationModal,
      user,
      toggleSubscribeModal,
      toggleAddCourseModal,
      courses,
    } = this.props;
    const { showTrailerModal, showFloatingActionBar } = this.state;
    const isAdmin = user && user.roles ? user.roles.includes('admin') : false;

    return (
      <div style={{ overflowX: 'hidden' }}>
        {/* Animated Hero Image and Featured Courses */}
        <Hero
          showRegistrationModal={showRegistrationModal}
          toggleTrailerModal={() => this.setState({ showTrailerModal: !showTrailerModal })}
          user={user}
          toggleSubscribeModal={toggleSubscribeModal}
        />
        {/* Recently Added Courses */}
        <div style={{ background: '#fff', paddingTop: 40, paddingBottom: 40 }}>
          {isAdmin && [
            <SectionTitle style={{ marginTop: 0, marginBottom: 17.5 }}>ADMIN TOOLS</SectionTitle>,
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FlatButton
                onClick={() => toggleAddCourseModal(true)}
                style={{ width: 260, marginTop: 0, marginBottom: 20 }}
              >
                <ButtonText>+ ADD NEW COURSE</ButtonText>
              </FlatButton>
            </div>,
          ]}

          <SectionTitle style={{ marginTop: 0 }}>Recently Added</SectionTitle>
          <CardList mini>
            {courses &&
              courses.slice(0, 4).map(course => {
                return (
                  <CourseCard
                    key={course.courseId}
                    backgroundImage={course.thumbnailImage}
                    title={course.instructorName}
                    tagline={course.tagline}
                    course={course}
                    mini
                  />
                );
              })}
          </CardList>

          {/* Value Propositions */}
          {!user && (
            <ValuePropositions>
              <ValuePropCard
                icon={<MusicIcon />}
                title="Learn"
                description="Learn from world-class producers, sound engineers and music artists"
              />
              <ValuePropCard
                icon={<SubscribeIcon />}
                title="Engage"
                description="Share your music for helpful feedback and a chance to work with a producer"
              />
              <ValuePropCard
                icon={<ShareIcon />}
                title="Subscribe"
                description="Purchase an all-access pass to all of our classes, samples and future content"
                style={{ borderRight: '0px', borderBottom: '0px' }}
              />
            </ValuePropositions>
          )}

          {/* My Classes */}
          {/* {user && [
            <SectionTitle key={user.uid} id="my-classes">
              My Classes
            </SectionTitle>,
            <CardList>
              <CourseCard backgroundImage={HeroImage3} title="BOI-1DA" tagline="Teaches Drumming" />

              <CourseCard
                backgroundImage={HeroImage4}
                title="Southside"
                tagline="Teaches Trap Production"
              />
            </CardList>,
          ]} */}

          {/* Available Courses */}
          <SectionTitle>Now Available</SectionTitle>
          <CardList>
            {courses &&
              courses.map(course => {
                return (
                  <CourseCard
                    key={course.courseId}
                    backgroundImage={course.thumbnailImage}
                    title={course.instructorName}
                    tagline={course.tagline}
                    course={course}
                  />
                );
              })}
          </CardList>

          {/* Coming Soon */}
          <SectionTitle id="comingSoon">Coming Soon</SectionTitle>
          <CardList>
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
          {/* Value Propositions */}
          {user && (
            <ValuePropositions>
              <ValuePropCard
                icon={<MusicIcon />}
                title="Learn"
                description="Learn from world-class producers, sound engineers and music artists"
              />
              <ValuePropCard
                icon={<SubscribeIcon />}
                title="Engage"
                description="Share your music for helpful feedback and a chance to work with a producer"
              />
              <ValuePropCard
                icon={<ShareIcon />}
                title="Subscribe"
                description="Purchase an all-access pass to all of our classes, samples and future content"
                style={{ borderRight: '0px', borderBottom: '0px' }}
              />
            </ValuePropositions>
          )}
        </div>
        <Footer />
        {/* Floating Buttons for Enrolling / Viewing a Preview */}
        <FloatingActionBar show={user ? false : showFloatingActionBar}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <FlatButton
              onClick={() => showRegistrationModal(true)}
              style={{ width: 160, marginRight: 10 }}
            >
              <ButtonText>Enroll</ButtonText>
            </FlatButton>
            <FlatButton
              onClick={() => this.setState({ showTrailerModal: true })}
              style={{ width: 160, backgroundColor: 'rgba(0, 0, 0, 0.275' }}
            >
              <ButtonText>Preview</ButtonText>
            </FlatButton>
          </div>
        </FloatingActionBar>
        {/* Modals */}
        <AuthModal />
        <TrailerModal
          open={showTrailerModal}
          close={() => this.setState({ showTrailerModal: false })}
        />
        <SubscribeModal />
        <PaymentModal />
        <AddCourseModal />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, admin }) => ({
  user: auth.user,
  email: auth.email,
  error: auth.error,
  loading: auth.loading,
  showModal: auth.showModal,
  courses: admin.courses,
});

export default connect(
  mapStateToProps,
  {
    showAuthModal,
    showRegistrationModal,
    toggleSubscribeModal,
    toggleAddCourseModal,
    fetchCourses,
  },
)(Home);
