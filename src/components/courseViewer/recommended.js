import React from 'react';
import { SectionTitle, HorizontalScrollView, InstructorCard } from '../common';

import HeroImage3 from '../../assets/hero-image-3.jpeg';
import HeroImage4 from '../../assets/hero-image-8.jpg';
import HeroImage5 from '../../assets/hero-image-10.png';

const Reccomended = () => {
  return [
    <SectionTitle key="SectionTitle-recommended">Recommended for You</SectionTitle>,
    <HorizontalScrollView
      key=".horizontal-scroll-reccomended-2"
      style={{ borderBottom: 'dotted 1px #bebebe', paddingBottom: 30, marginBottom: 10 }}
    >
      <InstructorCard
        key="0"
        backgroundImage={HeroImage3}
        name="BOI-1DA"
        tagline="Teaches trap production"
      />
      <InstructorCard
        key="1"
        backgroundImage={HeroImage4}
        name="Southside"
        tagline="Teaches trap production"
      />
      <InstructorCard
        key="2"
        backgroundImage={HeroImage5}
        name="London on da track"
        tagline="Teaches trap production"
      />
      <InstructorCard
        key="3"
        backgroundImage={HeroImage3}
        name="BOI-1DA"
        tagline="Teaches trap production"
      />
      <InstructorCard
        key="4"
        backgroundImage={HeroImage4}
        name="Southside"
        tagline="Teaches trap production"
      />
      <InstructorCard
        key="5"
        backgroundImage={HeroImage5}
        name="London on da track"
        tagline="Teaches trap production"
      />
      <InstructorCard
        key="6"
        backgroundImage={HeroImage5}
        name="London on da track"
        tagline="Teaches trap production"
      />
      <InstructorCard
        key="7"
        backgroundImage={HeroImage5}
        name="London on da track"
        tagline="Teaches trap production"
      />
    </HorizontalScrollView>,
  ];
};

export default Reccomended;
