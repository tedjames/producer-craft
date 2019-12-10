import React from 'react';
import { browserHistory, withRouter } from 'react-router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setSelectedCourse, clearLessons } from '../../actions';

const Container = styled.div`
  flex: 0 0 auto;
  height: 350px;
  width: 280px;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: center;
  background-color: #555;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: 7.5px;
  margin-left: 20px;
  margin-right: 5px;
  padding-bottom: 15px;
  box-shadow: inset 280px -40px 70px 140px rgba(0, 0, 0, 0.75);
  transition: all 0.35s ease;
  opacity: 0.9;
  cursor: pointer;
  @media (max-width: 1200px) {
    border-radius: 15px;
  }
  :hover {
    box-shadow: inset 340px -40px 70px 140px rgba(0, 0, 0, 0.7);
  }
  :active {
    opacity: 0.8;
  }
`;

const InstructorTitle = styled.p`
  font-family: proxima-nova;
  font-weight: 800;
  font-style: black;
  font-size: 20px;
  color: #fff;
  opacity: ${props => (props.tagline ? '0.8' : '0.9')};
  letter-spacing: 0.55px;
  text-transform: uppercase;
  cursor: default;
  max-width: 200px;
  text-align: center;
  align-self: center;
  cursor: pointer;
  margin-bottom: 0px;
  line-height: 16px;
  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 0px;
  }
  @media (max-width: 600px) {
    font-size: 18px;
    margin-top: 0px;
  }
`;

const PreviewTagline = styled.p`
  font-family: proxima-nova;
  font-weight: 700;
  font-style: black;
  font-size: 12px;
  color: #eee;
  opacity: 0.8;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 2px;
  margin-bottom: 10px;
  cursor: pointer;
  line-height: 12px;
  text-shadow: 4px 4px 16px rgba(0, 0, 0, 0.77);
  @media (max-width: 480px) {
    max-width: 280px;
  }
`;

const InstructorCard = ({
  style,
  backgroundImage,
  name,
  tagline,
  course,
  setSelectedCourse,
  clearLessons,
}) => {
  const handleClick = () => {
    const { urlSlug } = course;
    setSelectedCourse(course);
    clearLessons();
    return browserHistory.push(`/preview/${urlSlug}`);
  };
  return (
    <Container
      style={{ ...style, alignItems: tagline && 'flex-start' }}
      backgroundImage={backgroundImage}
      onClick={handleClick}
    >
      <InstructorTitle
        tagline={tagline}
        style={tagline && { alignSelf: 'flex-start', textAlign: 'left', paddingLeft: 25 }}
        className="disable-selection"
      >
        {name}
      </InstructorTitle>
      {tagline && (
        <PreviewTagline style={{ alignSelf: 'flex-start', textAlign: 'left', paddingLeft: 25 }}>
          {tagline}
        </PreviewTagline>
      )}
    </Container>
  );
};

export default withRouter(
  connect(
    null,
    { setSelectedCourse, clearLessons },
  )(InstructorCard),
);
