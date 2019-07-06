import React from 'react';
import VideoPlayer from './VideoPlayer';

const videoJsOptions = {
  autoplay: false,
  playbackRates: [0.5, 1, 1.25, 1.5, 2],
  width: 720,
  height: 405,
  controls: true,
  sources: [
    {
      src: 'https://dfkv75gx1ii0n.cloudfront.net/60slaunchpromo14/master.m3u8',
      type: 'application/x-mpegURL',
    },
  ],
};

function StreamingTest() {
  return (
    <div>
      <VideoPlayer {...videoJsOptions} />
    </div>
  );
}

export default StreamingTest;
