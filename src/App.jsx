import React from 'react';
import Progress from './components/Progress';
import Play from './components/Play';
import Time from './components/Time';
import Next from './components/Next';
import PlaybackRate from './components/PlaybackRate';
import Volume from './components/Volume';
import FullScreen from './components/FullScreen';

import './style.less';

export default function () {
  return (
    <>
      <Progress />
      <div className="chimee-controlbar__groups">
        <div className="chimee-controlbar__float--left">
          <Play />
          <Next />
          <Time />
        </div>
        <div className="chimee-controlbar__float--right">
          <PlaybackRate />
          <Volume />
          <FullScreen />
        </div>
      </div>
    </>
  );
}