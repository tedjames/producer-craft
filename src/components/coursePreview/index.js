/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import styled from 'styled-components';
// Redux
import { connect } from 'react-redux';
import {
  showAuthModal,
  showRegistrationModal,
  toggleSubscribeModal,
  togglePaymentModal,
  toggleAddLessonModal,
  toggleEditCourseModal,
  fetchCourseBySlug,
  fetchLessons,
  clearLessons,
} from '../../actions';

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
  ReturnSection,
  SubscribeModal,
  PaymentModal,
  FlatButton,
  ButtonText,
  AddLessonModal,
  EditCourseModal,
} from '../common';
import Hero from './hero';
import ActionBar from './actionBar';
import Recommended from './recommended';
import Bio from './bio';

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

class CoursePreview extends Component {
  constructor(props) {
    super(props);
    this.handleEnroll = this.handleEnroll.bind(this);

    this.state = {
      showTrailerModal: false,
      lessonFetchAttempts: 0,
    };
  }

  componentDidMount() {
    const {
      course,
      fetchCourseBySlug,
      fetchLessons,
      lessons,
      clearLessons,
      params,
      clearComments,
    } = this.props;
    const { urlSlug } = params;
    clearLessons();
    clearComments();

    if (!lessons && course.courseId) {
      fetchLessons({ courseId: course.courseId });
    }

    if (!course) {
      fetchCourseBySlug({ urlSlug });
    }
  }

  componentDidUpdate() {
    const { course, fetchLessons, lessons, params } = this.props;
    window.scrollTo(0, 0);

    if (course) {
    if (!lessons) {
        console.log('componentDidUpdate: FETCHING LESSONS');
      fetchLessons({ courseId: course.courseId });
    }
      if (course.urlSlug !== params.urlSlug) {
        window.scrollTo(0, 0);
        document.location.reload();
      }
    }
  }

  handleEnroll() {
    // eslint-disable-next-line no-shadow
    const { toggleSubscribeModal } = this.props;
    const productDetails = {
      productId: 'prod_oofmeiseterg9ub9u',
      productName: 'Scott Storch Teaches Music Production',
      amount: '44.95',
    };
    toggleSubscribeModal({ productDetails });
  }

  render() {
    // eslint-disable-next-line no-shadow
    const {
      showRegistrationModal,
      user,
      toggleAddLessonModal,
      toggleEditCourseModal,
      course,
      lessons,
      courses,
    } = this.props;
    const { showTrailerModal } = this.state;
    const isAdmin = user && user.roles ? user.roles.includes('admin') : false;

    return (
      <div style={{ overflowX: 'hidden' }}>
        {/* Hero Image, Title and Enroll/Follow Buttons */}
        <Hero
          name={course.instructorName}
          tagline={course.tagline}
          showRegistrationModal={showRegistrationModal}
          showTrailerModal={() => this.setState({ showTrailerModal: true })}
          handleEnroll={this.handleEnroll}
          user={user}
          course={course}
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
              backgroundImage={course.thumbnailImage}
            >
              <PlayButton />
            </TrailerCard>
          </TrailerContainer>

          {/* Instructor Bio */}
          <Bio
            title={course.bioTitle}
            description={course.bioDescription}
            buttonText="Read more"
            backgroundImage={course.bioImage}
            onClick={() => window.open(course.readMoreUrl, '_blank')}
          />

          {/* Admin Tools */}
          {isAdmin && (
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <FlatButton
              onClick={() => toggleEditCourseModal(true)}
              style={{
                width: 260,
                marginTop: 7.5,
                marginRight: 10,
                marginBottom: 0,
                background: '#ddd',
              }}
            >
              <ButtonText style={{ color: '#555' }}>EDIT COURSE</ButtonText>
            </FlatButton>
          </div>
          )}

          {/* Value Propositions */}
          <ValuePropositions style={{ paddingTop: 0 }}>
            <ValuePropCard
              icon={<MusicIcon />}
              title={course.valuePropTitle}
              description={course.valuePropDescription}
            />
            <ValuePropCard
              icon={<SubscribeIcon />}
              title={course.valuePropTitle2}
              description={course.valuePropDescription2}
            />
            <ValuePropCard
              icon={<ShareIcon />}
              title={course.valuePropTitle3}
              description={course.valuePropDescription3}
              style={{ borderRight: '0px', borderBottom: '0px' }}
            />
          </ValuePropositions>

          {/* Lesson Plan */}
          <SectionTitle>Lesson Plan</SectionTitle>
          <CardList>
            {lessons &&
              lessons.map(lesson => {
                return (
                  <LessonCard
                    key={lesson.lessonId}
                    backgroundImage={lesson.thumbnailImage}
                    title={lesson.lessonNumber}
                    tagline={lesson.lessonName}
                    lesson={lesson}
                    course={course}
                  />
                );
              })}
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isAdmin && (
              <FlatButton
                onClick={() => toggleAddLessonModal(true)}
                style={{ width: 260, marginTop: 10, marginBottom: 0 }}
              >
                <ButtonText>+ ADD NEW LESSON</ButtonText>
              </FlatButton>
              )}
            </div>
          </CardList>

          {/*  Action Bar: (Purchase Course, Follow, Social Media, View Profile) */}
          <ActionBar
            showRegistrationModal={() => showRegistrationModal(true)}
            showTrailerModal={() => this.setState({ showTrailerModal: true })}
            handleEnroll={this.handleEnroll}
            user={user}
            slug="scott-storch-teaches-music-production"
            course={course}
          />

          {/* Recommended Courses */}
          {courses && (
            <Recommended courses={courses} selectedCourse={course} key="recommended-courses" />
          )}

          {/* Return Home Button */}
          <ReturnSection />
        </div>
        <Footer />
        {/* Modals */}
        <AuthModal />
        <TrailerModal
          open={showTrailerModal}
          close={() => this.setState({ showTrailerModal: false })}
          showEnrollModal={this.handleEnroll}
        />
        <SubscribeModal />
        <PaymentModal />
        <EditCourseModal />
        <AddLessonModal />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, view, admin }) => ({
  user: auth.user,
  firstName: auth.firstName,
  lastName: auth.lastName,
  email: auth.email,
  password: auth.password,
  confirmPassword: auth.confirmPassword,
  error: auth.error,
  loading: auth.loading,
  showModal: auth.showModal,
  course: view.selectedCourse,
  lessons: admin.lessons,
  courses: admin.courses,
});

export default connect(
  mapStateToProps,
  {
    showAuthModal,
    showRegistrationModal,
    toggleSubscribeModal,
    togglePaymentModal,
    toggleAddLessonModal,
    toggleEditCourseModal,
    fetchCourseBySlug,
    fetchLessons,
    clearLessons,
  },
)(CoursePreview);
