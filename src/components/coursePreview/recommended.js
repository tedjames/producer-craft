import React from 'react';
import styled from 'styled-components';
import { SectionTitle, HorizontalScrollView, InstructorCard } from '../common';

import HeroImage3 from '../../assets/hero-image-3.jpeg';
import HeroImage4 from '../../assets/hero-image-8.jpg';
import HeroImage5 from '../../assets/hero-image-10.png';

const Reccomended = props => {
  return [
    <SectionTitle>Recommended for You</SectionTitle>,
    <HorizontalScrollView
      style={{ borderBottom: 'dotted 1px #bebebe', paddingBottom: 30, marginBottom: 10 }}
    >
      <InstructorCard
        backgroundImage={HeroImage3}
        name="BOI-1DA"
        tagline="Teaches trap production"
      />
      <InstructorCard
        backgroundImage={HeroImage4}
        name="Southside"
        tagline="Teaches trap production"
      />
      <InstructorCard
        backgroundImage={HeroImage5}
        name="London on da track"
        tagline="Teaches trap production"
      />
      <InstructorCard
        backgroundImage={HeroImage3}
        name="BOI-1DA"
        tagline="Teaches trap production"
      />
      <InstructorCard
        backgroundImage={HeroImage4}
        name="Southside"
        tagline="Teaches trap production"
      />
      <InstructorCard
        backgroundImage={HeroImage5}
        name="London on da track"
        tagline="Teaches trap production"
      />
      <InstructorCard
        backgroundImage={HeroImage5}
        name="London on da track"
        tagline="Teaches trap production"
      />
      <InstructorCard
        backgroundImage={HeroImage5}
        name="London on da track"
        tagline="Teaches trap production"
      />
    </HorizontalScrollView>,
  ];
};

export default Reccomended;
