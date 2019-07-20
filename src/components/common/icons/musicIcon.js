import React from 'react';
import FooterIconButton from './footerIconButton';

const MusicIcon = () => {
  return (
    <FooterIconButton>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#52bdff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-music icon-gradient"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    </FooterIconButton>
  );
};

export default MusicIcon;
