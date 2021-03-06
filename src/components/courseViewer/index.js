/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import styled from 'styled-components';
import { browserHistory, withRouter } from 'react-router';

import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import FileCard from './fileCard';
import LessonBackground from '../../assets/lessonBackground.png';

// Redux
import {
  showAuthModal,
  showRegistrationModal,
  toggleSubscribeModal,
  togglePaymentModal,
  toggleAddLessonModal,
  toggleEditLessonModal,
  toggleEditCourseModal,
  toggleAddFileModal,
  toggleEditFileModal,
  setSelectedLesson,
  clearLessons,
  fetchLessons,
  fetchCourseBySlug,
  fetchCourses,
  fetchComments,
  clearComments,
} from '../../actions';

// Components
import {
  AuthModal,
  TrailerModal,
  Footer,
  PlayButton,
  AnimatedButton,
  ReturnSection,
  SubscribeModal,
  PaymentModal,
  FlatButton,
  ButtonText,
  EditLessonModal,
  AddLessonModal,
  EditCourseModal,
  AddFileModal,
  EditFileModal,
} from '../common';
import Hero from './hero';
import ActionBar from './actionBar';
import Recommended from './recommended';
import CommentSubmission from './commentSubmission';
import Comment from './comment';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TrailerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 60%;
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
  @media (max-width: 976px) {
    height: 320px;
    width: 80%;
  }
  @media (max-width: 800px) {
    height: 300px;
    width: 80%;
  }
  @media (max-width: 700px) {
    height: 280px;
    width: 80%;
  }
  @media (max-width: 600px) {
    height: 240px;
    width: 80%;
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
  justify-content: flex-start;
  position: relative;
  transform: translateY(-270px);
  margin-bottom: -270px;
  transition: all 0.35s ease;
  padding-left: 40px;
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
  @media (max-width: 520px) {
    padding-left: 28px;
  }
`;

const CourseDetails = styled.div`
  display: flex;
  flex-direction: row;
  background: #eee;
  padding-left: 42.5px;
  @media (max-width: 520px) {
    padding-left: 30px;
  }
  @media (max-width: 350px) {
    padding-left: 20px;
  }
  @media (max-width: 335px) {
    padding-left: 17.5px;
  }
  @media (max-width: 325px) {
    padding-left: 12.5px;
  }
`;
const LessonDetails = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`;
const LessonPlan = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.5;
  margin-top: -190px;
  z-index: 1000;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  margin-right: 0px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  @media (min-width: 1400px) {
    margin-right: 40px;
  }
  @media (max-width: 976px) {
    display: none;
  }
`;

const LessonTitle = styled.p`
  font-family: neue-haas-grotesk-text, sans-serif;
  font-weight: 700;
  font-style: black;
  font-size: 30px;
  text-align: left;
  opacity: 0.7;
  margin-top: 5px;
  margin-bottom: 15px;
  color: #111;
`;

const LessonTitleNumber = styled.p`
  font-family: proxima-nova;
  font-weight: 800;
  font-style: black;
  font-size: 14px;
  text-align: left;
  opacity: 0.3;
  margin-top: 32.5px;
  margin-bottom: 2.5px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #444;
`;

const LessonPlanTitle = styled.p`
  font-family: proxima-nova;
  font-weight: 900;
  font-size: 12px;
  text-align: left;
  padding-left: 5px;
  opacity: 0.75;
  background: -webkit-linear-gradient(#888, #333);
  color: #888;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 20px;
  margin-bottom: 10px;
  letter-spacing: 5.5px;
  text-transform: uppercase;
  cursor: default;
`;

const LessonPreview = styled.div`
  display: flex;
  margin-bottom: 5px;
  padding-top: 10px;
  margin-top: 5px;
  border-top: dotted 1px #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
  :hover {
    opacity: 0.85;
  }
  :active {
    opacity: 0.725;
  }
`;
const Thumbnail = styled.div`
  height: 94px;
  width: 160px;
  min-width: 160px;
  border-radius: 4px;
  box-shadow: 2px 2px 66px -35px rgba(0, 0, 0, 0.1);
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: 75% 25%;
  background-color: #555;
  opacity: 0.9;
  cursor: pointer;
`;

const LessonPreviewInfo = styled.div`
  width: 55%;
  cursor: pointer;
  padding-right: 20px;
  padding-left: 10px;
`;

const LessonNumber = styled.p`
  font-family: proxima-nova;
  font-weight: 800;
  font-size: 11px;
  text-align: left;
  color: #bebebe;
  margin-bottom: 5px;
  letter-spacing: 3.5px;
  text-transform: uppercase;
  cursor: pointer;
`;
const LessonName = styled.p`
  font-family: neue-haas-grotesk-text, sans-serif;
  font-weight: 700;
  font-size: 15px;
  text-align: left;
  color: #555;
  margin-bottom: 5px;
  margin-top: 0px;
  cursor: pointer;
`;

const LessonDescription = styled.p`
  font-family: roboto-condensed;
  font-weight: 400;
  font-size: 16px;
  margin-top: 0px;
  padding-right: 60px;
  color: #111;
  text-shadow: 2px 2px 5px rgba(150, 150, 150, 0.15);
`;

const FilesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-right: 20px;
`;
const SharingButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0px;
`;
const ShareIconButton = styled.div`
  margin-right: 15px;
  margin-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.85;
  }
  :active {
    opacity: 0.7;
  }
`;

const ShareText = styled.p`
  font-family: proxima-nova;
  font-weight: 900;
  font-size: 11px;
  text-align: left;
  padding-left: 2.5px;
  color: #ccc;
  margin-top: 25px;
  margin-bottom: 12.5px;
  letter-spacing: 5.5px;
  text-transform: uppercase;
  cursor: default;
`;

const Comments = styled.div`
  border-top: 1px dotted #bebebe;
  margin-right: 40px;
  margin-top: 20px;
`;
const CommentSectionTitle = styled.div`
  font-family: proxima-nova;
  font-weight: 900;
  font-style: black;
  font-size: 12px;
  text-align: left;
  color: #bebebe;
  margin-top: 25px;
  margin-bottom: 20px;
  letter-spacing: 5px;
  text-transform: uppercase;
`;

const LessonPlanButton = styled.div`
  display: none;
  @media (max-width: 976px) {
    display: flex;
  }
`;

const LessonPlanModal = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 50px;
  padding-bottom: 20px;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23bcb4c7' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
`;

const MainContainer = styled.div`
  background: #eee;
  padding-top: 65px;
  padding-bottom: 30px;
  @media (orientation: landscape) {
    padding-top: 100px;
  }
`;

class CourseViewer extends Component {
  constructor(props) {
    super(props);
    this.handleEnroll = this.handleEnroll.bind(this);
    this.handleLessonChange = this.handleLessonChange.bind(this);

    this.state = {
      showTrailerModal: false,
      showLessonPlanModal: false,
    };
  }

  componentDidMount() {
    const {
      course,
      fetchCourseBySlug,
      fetchLessons,
      lessons,
      selectedLesson,
      setSelectedLesson,
      fetchComments,
      comments,
    } = this.props;

    // Get urlSlug - for case where url is typed in
    const pathArray = window.location.pathname.split('/');
    const urlSlug = pathArray[2];
    const lessonNumber = pathArray[3];
    clearComments();

    if (!course) {
      fetchCourseBySlug({ urlSlug });
      console.log('componentDidMount: FETCHING COURSE');
    }

    if (!lessons && course.courseId) {
      fetchLessons({ courseId: course.courseId });
      console.log('componentDidMount: FETCHING LESSONS');
    }

    if (!selectedLesson && lessons) {
      console.log('SETTING SELECTED LESSON', lessons);

      setSelectedLesson(lessons[lessonNumber]);
    }

    if (!comments) {
      if (selectedLesson) {
        console.log('componentDidMount: FETCHING COMMENTS');
        fetchComments({ lessonId: selectedLesson.lessonId });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { course, fetchLessons, lessons, selectedLesson, setSelectedLesson, params } = this.props;
    const { lessonNumber } = params;
    if (selectedLesson) {
      if (lessonNumber !== selectedLesson.lessonNumber) {
        document.location.reload();
      }
    }

    if (!lessons && course && !prevProps.comments) {
      console.log('componentDidUpdate: FETCHING LESSONS w/ prevProps: ', prevProps);
      return !prevProps.lessons && fetchLessons({ courseId: course.courseId });
    }

    if (!selectedLesson && lessons && !prevProps.comments) {
      setSelectedLesson(lessons[lessonNumber - 1]);
    }

    // if (!comments) {
    //   if (selectedLesson) {
    //     console.log('componentDidUpdate: FETCHING COMMENTS w/ prevProps: ', prevProps, comments);
    //     return !prevProps.comments && fetchComments({ lessonId: selectedLesson.lessonId });
    //   }
    // }
  }

  componentWillUnmount() {
    clearComments();
  }

  handleEnroll() {
    const { toggleSubscribeModal } = this.props;
    const productDetails = {
      productId: '7cba5002b23d11e9a2a3',
      productName: 'Scott Storch Teaches Music Production',
      amount: '44.95',
    };
    toggleSubscribeModal({ productDetails });
  }

  handleLessonChange(lesson) {
    const { course, setSelectedLesson, clearComments } = this.props;
    browserHistory.push(`/courses/${course.urlSlug}/${lesson.lessonNumber}`);
    clearComments();
    setSelectedLesson(lesson);
    return this.setState({ showLessonPlanModal: false });
  }

  render() {
    // eslint-disable-next-line no-shadow
    const {
      showRegistrationModal,
      user,
      toggleAddLessonModal,
      toggleEditLessonModal,
      toggleEditCourseModal,
      toggleAddFileModal,
      selectedLesson,
      course,
      courses,
      lessons,
      newComment,
      comments,
    } = this.props;
    const { showTrailerModal, showLessonPlanModal } = this.state;
    const isAdmin = user && user.roles ? user.roles.includes('admin') : false;

    return (
      <div style={{ overflowX: 'hidden' }} id="course-viewer">
        {/* Hero Image, Title and Enroll/Follow Buttons */}
        <Hero showRegistrationModal={showRegistrationModal} backgroundImage={LessonBackground} />

        <MainContainer>
          {/* Profile Image */}
          <TrailerContainer>
            <TrailerCard
              onClick={() => this.setState({ showTrailerModal: true })}
              backgroundImage={selectedLesson ? selectedLesson.trailerImage : null}
            >
              <PlayButton />
            </TrailerCard>
          </TrailerContainer>

          <CourseDetails>
            <LessonDetails>
              <LessonTitleNumber>
                <span style={{ fontSize: 12, letterSpacing: 2, marginRight: 10 }}>//</span>
                Lesson {selectedLesson ? selectedLesson.lessonNumber : ''}
              </LessonTitleNumber>
              <LessonTitle>
                {selectedLesson ? selectedLesson.lessonName : 'Loading title'}
              </LessonTitle>
              <LessonDescription>
                {selectedLesson ? selectedLesson.description : '...'}
              </LessonDescription>

              <FilesSection>
                {selectedLesson &&
                  selectedLesson.files &&
                  selectedLesson.files.map(file => {
                    const { fileName, fileId, path } = file;
                    return (
                      <FileCard
                        key={file.fileId}
                        fileName={fileName}
                        fileId={fileId}
                        path={path}
                        lessonId={selectedLesson.lessonId}
                      />
                    );
                  })}
              </FilesSection>

              {/* Share this Course */}
              <ShareText className="disable-selection">Share this course</ShareText>
              <SharingButtons>
                <ShareIconButton
                  onClick={() => window.open(`http://${course.twitterUrl}`, '_blank')}
                >
                  <svg
                    enableBackground="new 0 0 56.693 56.693"
                    height="24"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 56.693 56.693"
                    width="24"
                    fill="#49a1eb"
                    fillOpacity="0.4"
                  >
                    <path d="M52.837,15.065c-1.811,0.805-3.76,1.348-5.805,1.591c2.088-1.25,3.689-3.23,4.444-5.592c-1.953,1.159-4.115,2-6.418,2.454  c-1.843-1.964-4.47-3.192-7.377-3.192c-5.581,0-10.106,4.525-10.106,10.107c0,0.791,0.089,1.562,0.262,2.303  c-8.4-0.422-15.848-4.445-20.833-10.56c-0.87,1.492-1.368,3.228-1.368,5.082c0,3.506,1.784,6.6,4.496,8.412  c-1.656-0.053-3.215-0.508-4.578-1.265c-0.001,0.042-0.001,0.085-0.001,0.128c0,4.896,3.484,8.98,8.108,9.91  c-0.848,0.23-1.741,0.354-2.663,0.354c-0.652,0-1.285-0.063-1.902-0.182c1.287,4.015,5.019,6.938,9.441,7.019  c-3.459,2.711-7.816,4.327-12.552,4.327c-0.815,0-1.62-0.048-2.411-0.142c4.474,2.869,9.786,4.541,15.493,4.541  c18.591,0,28.756-15.4,28.756-28.756c0-0.438-0.009-0.875-0.028-1.309C49.769,18.873,51.483,17.092,52.837,15.065z" />
                  </svg>
                </ShareIconButton>
                <ShareIconButton
                  onClick={() => window.open(`http://${course.facebookUrl}`, '_blank')}
                >
                  <svg width="17" height="17" fill="#3f5996" fillOpacity="0.65" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </ShareIconButton>
                <ShareIconButton
                  onClick={() => window.open(`http://${course.redditUrl}`, '_blank')}
                >
                  <svg width="20" height="20" fill="red" fillOpacity="0.55" viewBox="0 0 24 24">
                    <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
                  </svg>
                </ShareIconButton>
                <ShareIconButton
                  onClick={() =>
                    (document.location = `mailto:?subject=${course.instructorName}%20is%20now%20on%20ProducerCraft.com&body=${course.instructorName}%20just%20launched%20a%20masterclass%20on: https://producercraft.com/preview/${course.urlSlug}%0d%0a%0d%0aProducer Craft offers producers a chance to work with and learn from top industry talent. Each course features break downs of an artist's biggest hits, their techniques, free sample packs and a chance to collab on a track with the artist or producer!`)
                  }
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#ccc"
                    stroke="#eee"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-mail"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </ShareIconButton>
              </SharingButtons>
              <LessonPlanButton>
                <AnimatedButton
                  onClick={() => this.setState({ showLessonPlanModal: true })}
                  containerStyle={{
                    width: 200,
                    alignSelf: 'flex-start',
                    marginTop: 5,
                  }}
                  textStyle={{ color: '#777' }}
                >
                  Lesson Plan
                </AnimatedButton>
              </LessonPlanButton>
              {isAdmin && [
                <ShareText className="disable-selection" style={{ marginBottom: 5 }}>
                  Admin Options
                </ShareText>,
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                  }}
                >
                  <FlatButton
                    onClick={() => toggleEditLessonModal(true)}
                    style={{
                      width: 260,
                      marginTop: 7.5,
                      marginRight: 10,
                      marginBottom: 0,
                    }}
                  >
                    <ButtonText>EDIT LESSON</ButtonText>
                  </FlatButton>

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

                  <FlatButton
                    onClick={() => toggleAddFileModal(true)}
                    style={{ width: 260, marginTop: 7.5, marginBottom: 0, background: '#ddd' }}
                  >
                    <ButtonText style={{ color: '#555' }}>+ ADD FILE</ButtonText>
                  </FlatButton>
                </div>,
              ]}

              {/* Comments Section */}
              <Comments>
                <CommentSectionTitle className="disable-selection">COMMENTS</CommentSectionTitle>
                <CommentSubmission user={user} lessonId={selectedLesson.lessonId} />
                {newComment &&
                  newComment.map(comment => {
                    const { message, commentId, lessonId, replyCount, nickname } = comment;
                    return (
                      <Comment
                        key={commentId}
                        nickname={nickname}
                        message={message}
                        commentId={commentId}
                        lessonId={lessonId}
                        replyCount={replyCount}
                      />
                    );
                  })}
                {comments &&
                  comments.map(comment => {
                    const {
                      commentId,
                      message,
                      lessonId,
                      likeCount,
                      replyCount,
                      nickname,
                    } = comment;

                    return (
                      <Comment
                        key={commentId}
                        nickname={nickname}
                        lessonId={lessonId}
                        commentId={commentId}
                        message={message}
                        likeCount={likeCount}
                        replyCount={replyCount}
                      />
                    );
                  })}
              </Comments>
            </LessonDetails>

            {/* Floating LessonPlan Card */}
            <LessonPlan>
              <LessonPlanTitle>Lesson Plan</LessonPlanTitle>
              {lessons &&
                lessons.map(lesson => {
                  return (
                    <LessonPreview
                      key={lesson.lessonId}
                      onClick={() => this.handleLessonChange(lesson)}
                    >
                      <Thumbnail backgroundImage={lesson.thumbnailImage} />
                      <LessonPreviewInfo>
                        <LessonNumber>// {lesson.lessonNumber}</LessonNumber>
                        <LessonName>{lesson.lessonName}</LessonName>
                      </LessonPreviewInfo>
                    </LessonPreview>
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
                    style={{ width: 260, marginTop: 15, marginBottom: 0, background: '#ddd' }}
                  >
                    <ButtonText style={{ color: '#555' }}>+ ADD NEW LESSON</ButtonText>
                  </FlatButton>
                )}
              </div>
            </LessonPlan>
          </CourseDetails>

          {/*  Action Bar: (Purchase Course, Follow, Social Media, View Profile) */}
          <ActionBar
            handlePreview={() => this.setState({ showTrailerModal: !showTrailerModal })}
            handleEnroll={this.handleEnroll}
            showRegistrationModal={() => showRegistrationModal(true)}
            showTrailerModal={() => this.setState({ showTrailerModal: true })}
            user={user}
            course={course}
          />

          {/* Recommended Courses */}

          {courses && <Recommended courses={courses} selectedCourse={course} />}

          {/* Return Home Button */}
          <ReturnSection />
        </MainContainer>
        <Footer />

        {/* Modals */}
        <AuthModal />
        <TrailerModal
          open={showTrailerModal}
          close={() => this.setState({ showTrailerModal: false })}
          showEnrollModal={this.handleEnroll}
        />
        <Dialog
          fullScreen
          open={showLessonPlanModal}
          onClose={() => this.setState({ showLessonPlanModal: false })}
          TransitionComponent={Transition}
        >
          <LessonPlanModal>
            <IconButton
              edge="start"
              color="#777"
              onClick={() => this.setState({ showLessonPlanModal: false })}
              aria-label="Close"
              style={{ float: 'right', position: 'relative', bottom: 15 }}
            >
              <CloseIcon />
            </IconButton>
            <LessonPlanTitle>Lesson Plan</LessonPlanTitle>
            {lessons &&
              lessons.map(lesson => {
                return (
                  <LessonPreview
                    key={lesson.lessonId}
                    onClick={() => this.handleLessonChange(lesson)}
                  >
                    <Thumbnail backgroundImage={lesson.thumbnailImage} />
                    <LessonPreviewInfo>
                      <LessonNumber>// {lesson.lessonNumber}</LessonNumber>
                      <LessonName>{lesson.lessonName}</LessonName>
                    </LessonPreviewInfo>
                  </LessonPreview>
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
                  style={{ width: 260, marginTop: 15, marginBottom: 0, background: '#ddd' }}
                >
                  <ButtonText style={{ color: '#555' }}>+ ADD NEW LESSON</ButtonText>
                </FlatButton>
              )}
            </div>
          </LessonPlanModal>
        </Dialog>
        <SubscribeModal />
        <PaymentModal />
        <EditLessonModal />
        <AddLessonModal />
        <EditCourseModal />
        <AddFileModal />
        <EditFileModal />
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
  selectedLesson: view.selectedLesson,
  course: view.selectedCourse,
  lessons: admin.lessons,
  courses: admin.courses,
  newComment: admin.newComment,
  comments: admin.comments,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      showAuthModal,
      showRegistrationModal,
      toggleSubscribeModal,
      togglePaymentModal,
      toggleAddLessonModal,
      toggleEditLessonModal,
      toggleEditCourseModal,
      toggleAddFileModal,
      toggleEditFileModal,
      clearLessons,
      fetchLessons,
      setSelectedLesson,
      fetchCourseBySlug,
      fetchCourses,
      fetchComments,
      clearComments,
    },
  )(CourseViewer),
);
