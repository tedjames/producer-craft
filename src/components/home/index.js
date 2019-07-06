import React from 'react';
import styled from 'styled-components';

import HeroImage from '../../assets/hero-image-3.jpeg';

const Hero = styled.div`
  height: 80vh;
  width: 100%;
  background-image: url(${HeroImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #555;
  box-shadow: inset 71px -29px 246px 190px rgba(0, 0, 0, 0.81);
`;

export const Home = () => {
  return (
    <div>
      <Hero />
      <p>home page</p>
    </div>
  );
};

export default Home;
