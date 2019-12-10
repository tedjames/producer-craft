import styled from 'styled-components';

const ValuePropositions = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 60px;
  margin-right: 60px;
  margin-top: 50px;
  margin-bottom: 40px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 0px;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export default ValuePropositions;
