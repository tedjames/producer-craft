import React from 'react';
import styled from 'styled-components';

const CircleButton = styled.button`
  height: 140px;
  width: 140px;
  border-radius: 200px;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  cursor: pointer;
  transition: all 0.35s ease;
  outline: none;
  border: rgba(255, 255, 255, 0.1) 1px solid;
  :hover {
    background-color: rgba(0, 0, 0, 0.45);
  }
`;

const PlayButton = ({ style, onClick }) => (
  <CircleButton style={style} onClick={onClick}>
    <svg
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      width="37.5px"
      height="37.5px"
      viewBox="0 0 443.307 443.306"
      xmlSpace="preserve"
      fill="#C0B6FD"
      style={{ position: 'relative', left: 3 }}
      className="icon-gradient-fill"
    >
      <g>
        <path
          d="M415.934,212.799L36.788,2.097C32.411-0.377,28.65-0.661,25.51,1.242c-3.14,1.902-4.708,5.328-4.708,10.276V431.78
		c0,4.952,1.569,8.381,4.708,10.284c3.14,1.902,6.901,1.622,11.278-0.855l379.146-210.703c4.381-2.478,6.571-5.434,6.571-8.856
		C422.505,218.224,420.314,215.274,415.934,212.799z"
        />
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  </CircleButton>
);

export default PlayButton;
