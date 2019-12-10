import React from 'react';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import { FlatButton, ButtonText, SectionTitle } from '../common';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 100vw;
  padding-top: 40px;
  padding-bottom: 20px;
  margin-top: 30px;
  display: flex;
  border-top: dotted 1px #bebebe;
  border-bottom: dotted 1px #bebebe;
  background-color: #f4f4f4;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dfdfdf' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
`;

const ShareBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const SocialIconButton = styled.a`
  margin-right: 20px;
  margin-top: 0px;
  cursor: pointer;
  :hover {
    opacity: 0.65;
  }
  :active {
    opacity: 0.4;
  }
`;

const ActionBar = ({ showRegistrationModal, slug, user, handleEnroll, course }) => {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <FlatButton
          onClick={user ? handleEnroll : showRegistrationModal}
          style={{ width: 160, marginRight: 10 }}
        >
          <ButtonText>Enroll</ButtonText>
        </FlatButton>
        <FlatButton
          onClick={() => browserHistory.push(`/courses/${slug}`)}
          style={{ width: 160, backgroundColor: 'rgba(0, 0, 0, 0.275' }}
        >
          <ButtonText>Preview</ButtonText>
        </FlatButton>
      </div>
      <SectionTitle style={{ marginTop: 25, marginBottom: 0, opacity: 0.35 }}>
        SHARE THIS COURSE
      </SectionTitle>
      <ShareBar>
        <SocialIconButton onClick={() => window.open(`http://${course.twitterUrl}`, '_blank')}>
          <svg
            enableBackground="new 0 0 56.693 56.693"
            height="24"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 56.693 56.693"
            width="24"
            fill="#49a1eb"
            fillOpacity="0.8"
          >
            <path d="M52.837,15.065c-1.811,0.805-3.76,1.348-5.805,1.591c2.088-1.25,3.689-3.23,4.444-5.592c-1.953,1.159-4.115,2-6.418,2.454  c-1.843-1.964-4.47-3.192-7.377-3.192c-5.581,0-10.106,4.525-10.106,10.107c0,0.791,0.089,1.562,0.262,2.303  c-8.4-0.422-15.848-4.445-20.833-10.56c-0.87,1.492-1.368,3.228-1.368,5.082c0,3.506,1.784,6.6,4.496,8.412  c-1.656-0.053-3.215-0.508-4.578-1.265c-0.001,0.042-0.001,0.085-0.001,0.128c0,4.896,3.484,8.98,8.108,9.91  c-0.848,0.23-1.741,0.354-2.663,0.354c-0.652,0-1.285-0.063-1.902-0.182c1.287,4.015,5.019,6.938,9.441,7.019  c-3.459,2.711-7.816,4.327-12.552,4.327c-0.815,0-1.62-0.048-2.411-0.142c4.474,2.869,9.786,4.541,15.493,4.541  c18.591,0,28.756-15.4,28.756-28.756c0-0.438-0.009-0.875-0.028-1.309C49.769,18.873,51.483,17.092,52.837,15.065z" />
          </svg>
        </SocialIconButton>
        <SocialIconButton onClick={() => window.open(`http://${course.facebookUrl}`, '_blank')}>
          <svg width="17" height="17" fill="#3f5996" fillOpacity="0.65" viewBox="0 0 24 24">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        </SocialIconButton>
        <SocialIconButton onClick={() => window.open(`http://${course.redditUrl}`, '_blank')}>
          <svg width="20" height="20" fill="red" fillOpacity="0.55" viewBox="0 0 24 24">
            <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
          </svg>
        </SocialIconButton>
        <SocialIconButton
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
        </SocialIconButton>
      </ShareBar>
    </Container>
  );
};

export default ActionBar;
