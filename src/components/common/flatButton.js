import styled from 'styled-components';

const FlatButton = styled.button`
  width: 180px;
  height: 40px;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2632ed;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  border: none;
  :hover {
    opacity: 0.9;
    transform: scale(0.99);
  }
  :active {
    opacity: 0.65;
    transform: scale(0.95);
  }
  @media (max-width: 320px) {
    transform: scale(0.95);
  }
`;

export default FlatButton;
