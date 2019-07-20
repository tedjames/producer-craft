/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
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
  FlatButton,
  ButtonText,
} from '../common';
import Hero from './hero';
import ActionBar from './actionBar';
import Recommended from './recommended';
import CommentSubmission from './commentSubmission';

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
import StorchProfile from '../../assets/storch-profile-image-3.jpg';

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
`;

const CourseDetails = styled.div`
  display: flex;
  flex-direction: row;
  background: #eee;
  padding-left: 42.5px;
`;
const LessonDetails = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`;
const LessonPlan = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  flex: 1.5;
  margin-top: -200px;
  z-index: 1000;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  margin-right: 0px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  box-shadow: 2px 2px 66px -35px rgba(0, 0, 0, 0.1);
  @media (min-width: 1400px) {
    margin-right: 40px;
  }
`;

const LessonTitle = styled.p`
  font-family: proxima-nova;
  font-weight: 800;
  font-style: black;
  font-size: 16px;
  text-align: left;
  opacity: 0.6;
  margin-top: 32.5px;
  margin-bottom: 15px;
  letter-spacing: 5px;
  text-transform: uppercase;
  background: -webkit-linear-gradient(#777, #444);
  color: #444;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LessonPlanTitle = styled.p`
  font-family: proxima-nova;
  font-weight: 900;
  font-size: 11px;
  text-align: left;
  padding-left: 5px;
  opacity: 0.75;
  background: -webkit-linear-gradient(#888, #333);
  color: #888;
  -webkit-background-clip: text;
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
  width: 168px;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: 75% 25%;
  background-color: #555;
  background-size: cover;
  background-position: 75% 25%;
  background-color: #555;
  margin-right: 10px;
  cursor: pointer;
`;

const LessonPreviewInfo = styled.div`
  width: 55%;
  cursor: pointer;
  padding-right: 20px;
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
  font-family: proxima-nova;
  font-weight: 800;
  font-size: 12px;
  text-align: left;
  color: #7a7a7a;
  opacity: 0.925;
  margin-bottom: 5px;
  letter-spacing: 3.5px;
  text-transform: uppercase;
  cursor: pointer;
  background: -webkit-linear-gradient(#7c7c7c, #484a5f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LessonDescription = styled.p`
  font-family: roboto-condensed;
  font-weight: 400;
  font-size: 16px;
  margin-top: 0px;
  padding-right: 60px;
  color: #222;
  text-shadow: 2px 2px 5px rgba(150, 150, 150, 0.15);
`;

const FilesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-right: 20px;
`;
const FileCard = styled.div`
  display: flex;
  height: 60px;
  margin-top: 10px;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  padding-left: 12.5px;
  padding-right: 17.5px;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 2px 2px 66px -35px rgba(0, 0, 0, 0.39);
  :hover {
    opacity: 0.85;
  }
  :active {
    opacity: 0.7;
  }
`;
const FileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #49a1eb;
  border-radius: 80px;
  height: 40px;
  width: 40px;
  margin-right: 12.5px;
  opacity: 0.8;
`;
const FileName = styled.div`
  font-family: roboto-condensed;
  font-weight: 400;
  font-size: 12px;
  color: #222;
  text-align: left;
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

class CourseViewer extends Component {
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
        />

        <div
          style={{
            background: '#eee',
            paddingTop: 40,
            paddingBottom: 30,
          }}
        >
          {/* Profile Image */}
          <TrailerContainer>
            <TrailerCard backgroundImage={StorchHero4}>
              <PlayButton />
            </TrailerCard>
          </TrailerContainer>

          <CourseDetails>
            <LessonDetails>
              <LessonTitle>Lesson 1 · Welcome to Ableton</LessonTitle>
              <LessonDescription>
                Thank you for being apart of my music production master class. I'm excited to show
                you the endless possibilities of digital audio workstations and hopefully teach a
                few unique tricks along the way. If this is your first time using ableton, we
                reccomend you skim through the manual for a quick run through of the basic
                functionality you need to get up and running.{' '}
              </LessonDescription>

              <FilesSection>
                <FileCard>
                  <FileIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f5f5f5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-link"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </FileIcon>
                  <FileName className="disable-selection">Ableton Template Project</FileName>
                </FileCard>
                <FileCard>
                  <FileIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f5f5f5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-link"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </FileIcon>
                  <FileName className="disable-selection">Scott Storch Drum Kit</FileName>
                </FileCard>
                <FileCard>
                  <FileIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f5f5f5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-link"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </FileIcon>
                  <FileName className="disable-selection">Drum Rack Presets</FileName>
                </FileCard>
              </FilesSection>

              <ShareText>Share this course</ShareText>
              <SharingButtons>
                <ShareIconButton>
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
                <ShareIconButton>
                  <svg width="17" height="17" fill="#3f5996" fillOpacity="0.65" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </ShareIconButton>
                <ShareIconButton>
                  <svg width="20" height="20" fill="red" fillOpacity="0.55" viewBox="0 0 24 24">
                    <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
                  </svg>
                </ShareIconButton>
              </SharingButtons>

              <AnimatedButton
                containerStyle={{
                  width: 200,
                  alignSelf: 'flex-start',
                  marginTop: 5,
                }}
                textStyle={{ color: '#777' }}
              >
                Next Lesson
              </AnimatedButton>

              {/* Social Sharing */}

              {/* TODO: ADD COMMENTS SECTION */}

              <Comments>
                <CommentSectionTitle>COMMENTS</CommentSectionTitle>
                <CommentSubmission />
              </Comments>
            </LessonDetails>

            {/* Floating LessonPlan Card */}
            <LessonPlan>
              <LessonPlanTitle>Lesson Plan</LessonPlanTitle>
              <LessonPreview>
                <Thumbnail backgroundImage={StorchHero4} />
                <LessonPreviewInfo>
                  <LessonNumber>// 1</LessonNumber>
                  <LessonName>Welcome to Ableton</LessonName>
                </LessonPreviewInfo>
              </LessonPreview>
              <LessonPreview>
                <Thumbnail backgroundImage={StorchHero4} />
                <LessonPreviewInfo>
                  <LessonNumber>// 2</LessonNumber>
                  <LessonName>Setting the vibe</LessonName>
                </LessonPreviewInfo>
              </LessonPreview>
              <LessonPreview>
                <Thumbnail backgroundImage={StorchHero4} />
                <LessonPreviewInfo>
                  <LessonNumber>// 3</LessonNumber>
                  <LessonName>Organizing your sounds</LessonName>
                </LessonPreviewInfo>
              </LessonPreview>
              <LessonPreview>
                <Thumbnail backgroundImage={StorchHero4} />
                <LessonPreviewInfo>
                  <LessonNumber>// 4</LessonNumber>
                  <LessonName>Workflow</LessonName>
                </LessonPreviewInfo>
              </LessonPreview>
              <LessonPreview>
                <Thumbnail backgroundImage={StorchHero4} />
                <LessonPreviewInfo>
                  <LessonNumber>// 5</LessonNumber>
                  <LessonName>Establishing the right tempo and vibe</LessonName>
                </LessonPreviewInfo>
              </LessonPreview>
              <LessonPreview>
                <Thumbnail backgroundImage={StorchHero4} />
                <LessonPreviewInfo>
                  <LessonNumber>// 5</LessonNumber>
                  <LessonName>Establishing the right tempo and vibe</LessonName>
                </LessonPreviewInfo>
              </LessonPreview>
              <LessonPreview>
                <Thumbnail backgroundImage={StorchHero4} />
                <LessonPreviewInfo>
                  <LessonNumber>// 5</LessonNumber>
                  <LessonName>Establishing the right tempo and vibe</LessonName>
                </LessonPreviewInfo>
              </LessonPreview>
              <LessonPreview>
                <Thumbnail backgroundImage={StorchHero4} />
                <LessonPreviewInfo>
                  <LessonNumber>// 5</LessonNumber>
                  <LessonName>Establishing the right tempo and vibe</LessonName>
                </LessonPreviewInfo>
              </LessonPreview>
              <LessonPreview>
                <Thumbnail backgroundImage={StorchHero4} />
                <LessonPreviewInfo>
                  <LessonNumber>// 5</LessonNumber>
                  <LessonName>Establishing the right tempo and vibe</LessonName>
                </LessonPreviewInfo>
              </LessonPreview>
              <LessonPreview>
                <Thumbnail backgroundImage={StorchHero4} />
                <LessonPreviewInfo>
                  <LessonNumber>// 5</LessonNumber>
                  <LessonName>Establishing the right tempo and vibe</LessonName>
                </LessonPreviewInfo>
              </LessonPreview>
            </LessonPlan>
          </CourseDetails>

          {/*  Action Bar: (Purchase Course, Follow, Social Media, View Profile) */}
          <ActionBar onClick={() => showRegistrationModal(true)} />

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
)(CourseViewer);
