import React from 'react';
import styled from 'styled-components';

const Text = styled.div`
  font-family: proxima-nova, sans-serif;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #fff;
  text-align: center;
  cursor: pointer;
`;

const ButtonText = ({ children, style }) => (
  <Text style={style} className="disable-selection">
    {children}
  </Text>
);

export default ButtonText;
