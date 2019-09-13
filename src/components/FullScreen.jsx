import React, { useContext, useEffect, useState, useCallback } from 'react';

import Context from '../Context';

function useToggleFullScreen() {
  const ctx = useContext(Context);
  return useCallback(() => {
    ctx.$fullscreen(!ctx.isFullscreen, 'container');
  }, []);
}

const Button = {
  FullScreen() {
    const toggleFullScreen = useToggleFullScreen();
    return (
      <div
        className="chimee-controlbar__fullscreen__button"
        onClick={toggleFullScreen}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <g fillRule="nonzero" stroke="#FFF" strokeLinecap="round" strokeWidth="2">
            <path d="M5 1H1v4M2 2l4 4" />
            <path d="M13 17h4v-4M16 16l-4-4" />
          </g>
        </svg>
      </div>
    );
  },
  ExitFullScreen() {
    const toggleFullScreen = useToggleFullScreen();
    return (
      <div
        className="chimee-controlbar__unfullscreen__button"
        onClick={toggleFullScreen}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <g fillRule="nonzero" stroke="#FFF" strokeLinecap="round" strokeWidth="2">
            <path d="M16 12h-4v4M13 13l4 4" />
            <path d="M2 6h4V2M5 5L1 1" />
          </g>
        </svg>
      </div>
    );
  }
}
export default function () {
  const ctx = useContext(Context);
  const [isFull, setFull] = useState(ctx.isFullscreen);

  useEffect(() => {
    ctx.$on('fullscreenchange', () => setFull(ctx.isFullscreen));
  }, []);

  return (
    <div className="chimee-controlbar__fullscreen chimee-controlbar__button">
      {isFull ? <Button.ExitFullScreen /> : <Button.FullScreen />}
    </div >
  )
}