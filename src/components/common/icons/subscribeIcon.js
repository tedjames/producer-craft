import React from 'react';
import FooterIconButton from './footerIconButton';

const SubscribeIcon = ({ size, color, style }) => (
  <FooterIconButton style={style}>
    <svg
      width={size || '28'}
      height={size || '28'}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || '#52bdff'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-check-circle icon-gradient"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  </FooterIconButton>
);

export default SubscribeIcon;
