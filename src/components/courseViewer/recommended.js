import React from 'react';
import { SectionTitle, HorizontalScrollView, InstructorCard } from '../common';

import HeroImage3 from '../../assets/hero-image-3.jpeg';
import HeroImage4 from '../../assets/hero-image-8.jpg';
import HeroImage5 from '../../assets/hero-image-10.png';

const Reccomended = ({ courses }) => {
  return [
    <SectionTitle key="SectionTitle-recommended">Recommended for You</SectionTitle>,
    <HorizontalScrollView
      key=".horizontal-scroll-reccomended-1"
      style={{ borderBottom: 'dotted 1px #bebebe', paddingBottom: 30, marginBottom: 10 }}
    >
      {courses &&
        courses.map(course => {
          return (
            <InstructorCard
              key={course.courseId}
              backgroundImage={course.thumbnailImage}
              name={course.instructorName}
              tagline={course.tagline}
              course={course}
            />
          );
        })}
    </HorizontalScrollView>,
  ];
};

export default Reccomended;
