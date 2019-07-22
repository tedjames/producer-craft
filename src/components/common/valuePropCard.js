import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 20px;
  margin-left: 20x;
  margin-right: 20px;
  padding-bottom: 30px;
  padding-left: 15px;
  padding-right: 25px;
  border-right: 1px dotted #ccc;
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    border-right: none;
    border-bottom: 1px dotted #ccc;
    padding-right: 15px;
    margin-right: 0px;
    margin-left: 0px;
  }
  @media (max-width: 480px) {
    padding-right: 0px;
    padding-left: 0px;
    margin-left: 0px;
    margin-right: 0px;
  }
`;

const ValueTitle = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 900;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.3);
  cursor: default;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 9px;
  @media (max-width: 1200px) {
    text-align: center;
  }
`;
const ValueDescription = styled.p`
  font-family: roboto-condensed, sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: #111;
  margin-top: 0px;
  margin-bottom: 0px;
  cursor: default;
  line-height: 18px;
  @media (max-width: 1200px) {
    text-align: center;
  }
  @media (max-width: 480px) {
    font-size: 13px;
    margin-top: 0px;
  }
`;

const ValuePropCard = ({ icon, style, title, description }) => {
  return (
    <Card style={style}>
      {icon && icon}
      <div>
        <ValueTitle className="disable-selection">{title}</ValueTitle>
        <ValueDescription className="disable-selection">{description}</ValueDescription>
      </div>
    </Card>
  );
};

export default ValuePropCard;
