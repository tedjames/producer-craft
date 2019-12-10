import React from 'react';
import { SectionTitle, HorizontalScrollView, InstructorCard } from '../common';

const Reccomended = ({ courses, selectedCourse }) => {
  return [
    <SectionTitle key="SectionTitle-recommended">Recommended for You</SectionTitle>,
    <HorizontalScrollView
      key=".horizontal-scroll-reccomended-1"
      style={{ borderBottom: 'dotted 1px #bebebe', paddingBottom: 30, marginBottom: 10 }}
    >
      {courses &&
        courses.map(course => {
          return (
            course.courseId !== selectedCourse.courseId && (
              <InstructorCard
                key={course.courseId}
                backgroundImage={course.thumbnailImage}
                name={course.instructorName}
                tagline={course.tagline}
                course={course}
              />
            )
          );
        })}
    </HorizontalScrollView>,
  ];
};

export default Reccomended;
