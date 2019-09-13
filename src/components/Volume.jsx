import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import cls from 'classnames';

import Context from '../Context';

let VOLUME_STORE = 0;

const Button = {
  Normal() {
    const ctx = useContext(Context);
    return (
      <div
        className="chimee-controlbar__volume__button__normal"
        onClick={() => ctx.volume = 0}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path stroke="#FFF" strokeWidth="2" strokeLinejoin="round" d="M1 13h4l6 4V1L5 5H1z" />
            <path d="M14.904 13.995A6.979 6.979 0 0 0 17 9a6.977 6.977 0 0 0-2.002-4.901" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    );
  },
  Mute() {
    const ctx = useContext(Context);
    return (
      <div
        className="chimee-controlbar__volume__button__mute"
        onClick={() => ctx.volume = VOLUME_STORE}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path d="M12 13.828V17a1 1 0 0 1-1.555.832L4.697 14H1a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1.172l2 2H2v6h3a1 1 0 0 1 .555.168L10 15.13v-3.303l2 2zm0-5.656l-2-2V2.869l-1.982 1.32-1.442-1.441 3.87-2.58A1 1 0 0 1 12 1v7.172zm3.416 3.415C15.796 10.793 16 9.913 16 9a5.976 5.976 0 0 0-1.716-4.201 1 1 0 1 1 1.428-1.4A7.976 7.976 0 0 1 18 9a7.975 7.975 0 0 1-1.108 4.064l-1.476-1.477zM1.293 1.707A1 1 0 1 1 2.707.293l15 15a1 1 0 0 1-1.414 1.414l-15-15z" fill="#FFF" fillRule="nonzero" />
          </g>
        </svg>
      </div>
    );
  }
}

function useVolumeStore() {
  const ctx = useContext(Context);

  return useEffect(() => {
    if (VOLUME_STORE) {
      ctx.volume = VOLUME_STORE;
    } else {
      VOLUME_STORE = ctx.volume;
    }

    ctx.$on('volumechange', () => {
      if (ctx.volume !== 0) {
        VOLUME_STORE = ctx.volume;
      }
    });
  }, []);
}

function useDragY(ref) {
  const ctx = useContext(Context);
  const [percent, upPer] = useState(0);
  const [active, upStatus] = useState(false);
  const [volume, setVolume] = useState(ctx.volume);

  const draging = useCallback(e => {
    const { bottom, height } = ref.current.getBoundingClientRect();
    const willVolume = Math.max(0, Math.min(1, (bottom - e.clientY) / height));
    upPer(willVolume);
  }, [ref]);
  const dragEnd = useCallback(e => {
    const { bottom, height } = ref.current.getBoundingClientRect();
    const volume = (bottom - e.clientY) / height;
    ctx.volume = Math.max(0, Math.min(1, volume));

    upPer(0);
    upStatus(false);
    window.removeEventListener('mousemove', draging);
    window.removeEventListener('mouseup', dragEnd);
    window.removeEventListener('contextmenu', dragEnd);
  }, [ref]);

  const onVolumeChange = useCallback(() => setVolume(ctx.volume), []);
  useEffect(() => ctx.$on('volumechange', onVolumeChange), []);


  return {
    active,
    volume: active ? percent : volume,
    onMouseDown: e => {
      draging(e);
      upStatus(true);
      window.addEventListener('mousemove', draging);
      window.addEventListener('mouseup', dragEnd);
      window.addEventListener('contextmenu', dragEnd);
    }
  };
}

export default function () {
  const trackRef = useRef(null);
  const { active, volume, onMouseDown } = useDragY(trackRef);
  const offset = (volume * 100) + '%';
  useVolumeStore();

  return (
    <div className={cls('chimee-controlbar__volume', { active })}>
      <div className="chimee-controlbar__volume__progress__container">
        <div className="chimee-controlbar__volume__progress">
          <div
            className="chimee-controlbar__volume__progress__track"
            onMouseDown={onMouseDown}
            ref={trackRef}
          >
            <div
              className="chimee-controlbar__volume__progress__track__volume"
              style={{ height: offset }}
            />
            <div
              className="chimee-controlbar__volume__progress__point"
              style={{ bottom: offset }}
            />
          </div>
        </div>
      </div>
      <div className="chimee-controlbar__button chimee-controlbar__volume__button">
        {volume === 0 ? <Button.Mute /> : <Button.Normal />}
      </div>
    </div>
  );
}