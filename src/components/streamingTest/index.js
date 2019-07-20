import React, { PureComponent } from 'react';
import ReactJWPlayer from 'react-jw-player';
import VideoImage from '../../assets/hero-image-5.jpg';

const playlist = [
  {
    file: 'https://content.jwplatform.com/videos/RyMYYAIp-LEbNYiQV.mp4',
    image: VideoImage,
  },
];

class StreamingTest extends PureComponent {
  render() {
    return (
      <ReactJWPlayer
        playerId="my-jw-player-instance"
        playerScript="https://cdn.jwplayer.com/libraries/Zel8X0GE.js"
        playlist={playlist}
      />
    );
  }
}

export default StreamingTest;
