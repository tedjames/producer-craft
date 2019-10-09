import React from 'react';
import styled from 'styled-components';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { setSelectedLesson } from '../../actions';

const Card = styled.div`
  height: 160px;
  width: 320px;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: 75% 25%;
  background-color: #555;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  flex-direction: column;
  border-radius: 5px;
  padding-left: 20px;
  padding-bottom: 15px;
  padding-right: 40px;
  box-shadow: inset 340px -40px 70px 140px rgba(0, 0, 0, 0.7);
  transition: all 0.35s ease;
  cursor: default;
  opacity: 0.925;
  @media (min-width: 1290px) {
    flex: 0 44%;
    margin: 5px;
    height: 360px;
  }
  @media (min-width: 481px) {
    height: 300px;
  }
  @media (max-width: 1289px) {
    width: 100%;
    margin-bottom: 17.5px;
    border-radius: 15px;
    padding-left: 120px;
    padding-bottom: 15px;
    padding-right: 80px;
  }
  @media (max-width: 900px) {
    width: 98%;
    height: 160px;
  }
  @media (max-width: 480px) {
  }
  :active {
    opacity: 0.85;
  }
`;

const PreviewTitle = styled.p`
  font-family: proxima-nova;
  font-weight: 800;
  font-style: black;
  font-size: 62px;
  color: #fff;
  opacity: 0.175;
  letter-spacing: 0.55px;
  text-transform: uppercase;
  cursor: default;
  margin-bottom: 20px;
  margin-right: 10px;
  line-height: 20px;
`;
const PreviewTagline = styled.p`
  font-family: proxima-nova;
  font-weight: 700;
  font-style: black;
  font-size: 14px;
  color: #fff;
  opacity: 0.8;
  letter-spacing: 5.5px;
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 0px;
  cursor: default;
  padding: 7.5px;
  padding-left: 10px;
  padding-right: 7px;
  @media (max-width: 480px) {
    max-width: 280px;
  }
  text-shadow: 4px 4px 16px rgba(0, 0, 0, 0.77);
  background-color: rgba(0, 0, 0, 0.925);
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
`;

const LessonCard = ({
  backgroundImage,
  title,
  tagline,
  disabled,
  course,
  lesson,
  setSelectedLesson,
}) => {
  const handleClick = () => {
    setSelectedLesson(lesson);
    browserHistory.push(`/courses/${course.urlSlug}/${lesson.lessonNumber}`);
  };
  return (
    <Card
      backgroundImage={backgroundImage}
      title={title}
      tagline={tagline}
      style={disabled && { opacity: 0.45, cursor: 'default' }}
      onClick={handleClick}
    >
      <PreviewTitle style={disabled && { cursor: 'default' }} className="disable-selection">
        {title}
      </PreviewTitle>
      <PreviewTagline style={disabled && { cursor: 'default' }} className="disable-selection">
        {tagline}
      </PreviewTagline>
    </Card>
  );
};

export default connect(
  null,
  { setSelectedLesson },
)(LessonCard);
