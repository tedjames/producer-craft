import React from 'react';
import styled from 'styled-components';

const MiniCardList = styled.div`
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 60px;
  margin-right: 60px;
  @media (max-width: 1200px) {
    flex-direction: column;
    margin-left: 60px;
    margin-right: 60px;
  }
  @media (max-width: 480px) {
    margin-left: 25px;
    margin-right: 25px;
  }
`;

const LargeCardList = styled.div`
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 60px;
  margin-right: 60px;
  @media (min-width: 2000px) {
    margin-left: 220px;
    margin-right: 220px;
  }
  @media (min-width: 1800px) and (max-width: 1999px) {
    margin-left: 160px;
    margin-right: 160px;
  }
  @media (min-width: 1600px) and (max-width: 1799px) {
    margin-left: 120px;
    margin-right: 120px;
  }
  @media (min-width: 1400px) and (max-width: 1599px) {
    margin-left: 80px;
    margin-right: 80px;
  }
  @media (min-width: 1290px) {
    flex-wrap: wrap;
  }
  @media (max-width: 1289px) {
    flex-direction: column;
    margin-left: 60px;
    margin-right: 60px;
  }
  @media (max-width: 480px) {
    margin-left: 25px;
    margin-right: 25px;
  }
`;

const CardList = ({ children, mini, style }) => {
  return mini ? (
    <MiniCardList style={style}>{children}</MiniCardList>
  ) : (
    <LargeCardList style={style}>{children}</LargeCardList>
  );
};

export default CardList;
