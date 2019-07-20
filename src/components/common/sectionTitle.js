import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 800;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 5px;
  color: #555;
  opacity: 0.75;
  margin-top: 45px;
  margin-bottom: 35px;
  text-align: center;
  cursor: default;
`;

const SectionTitle = ({ style, children, onClick, id }) => {
  return (
    <Text id={id} onClick={onClick} style={style} className="disable-selection">
      {children}
    </Text>
  );
};

export default SectionTitle;
