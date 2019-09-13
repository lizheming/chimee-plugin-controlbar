import React, { useContext, useEffect, useState, useCallback } from 'react';
import Progress from './components/Progress';
import Play from './components/Play';
import Time from './components/Time';
import Next from './components/Next';
import PlaybackRate from './components/PlaybackRate';
import Volume from './components/Volume';
import FullScreen from './components/FullScreen';

import Context from './Context';

import './style.less';

function useHoverhide() {
  const ctx = useContext(Context);
  const [status, upStatus] = useState(false);

  const hide = useCallback(() => upStatus(false), []);
  const show = useCallback(() => {
    upStatus(true);
    if (ctx.autoHideId) {
      clearTimeout(ctx.autoHideId);
    }
    ctx.autoHideId = setTimeout(hide, 5000);
  }, []);

  useEffect(() => {
    ctx.$on('mouseenter', show, { target: 'container' });
    ctx.$on('mousemove', show, { target: 'container' });
    ctx.$on('click', show, { target: 'container' });
    ctx.$on('mouseleave', hide, { target: 'container' });
    return () => {
      ctx.$off('mouseenter', show, { target: 'container' });
      ctx.$off('mousemove', show, { target: 'container' });
      ctx.$off('click', show, { target: 'container' });
      ctx.$off('mouseleave', hide, { target: 'container' });
    }
  }, []);

  return status;
};


export default function () {
  const status = useHoverhide();
  if (!status) {
    return null;
  }

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