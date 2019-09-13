import React, { useContext, useRef, useState, useEffect, useCallback } from 'react';
import cls from 'classnames';
import formatTime from '../utils/duration';
import Context from '../Context';

function useBuffer(ctx) {
  const [buffer, setBuffer] = useState(0);

  const onProgress = useCallback(() => {
    try {
      const buffer = ctx.buffered.end(0);
      setBuffer(buffer);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    ctx.$on('progress', onProgress);
    return () => ctx.$off('progress', onProgress);
  }, []);

  return buffer / ctx.duration || 0;
}

function useDragX(ref) {
  const ctx = useContext(Context);
  const [percent, upPer] = useState(0);
  const [active, upStatus] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const draging = useCallback(e => {
    const { width, left } = ref.current.getBoundingClientRect();
    upPer((e.pageX - left) / width);
  }, [ref]);

  const dragEnd = useCallback(e => {
    const { width, left } = ref.current.getBoundingClientRect();
    ctx.currentTime = (e.pageX - left) / width * ctx.duration;
    upPer(0);
    upStatus(false);
    window.removeEventListener('mousemove', draging);
    window.removeEventListener('mouseup', dragEnd);
    window.removeEventListener('contextmenu', dragEnd);
  }, [ref]);

  const onTimeUpdate = useCallback(() => setCurrentTime(ctx.currentTime), []);
  useEffect(() => ctx.$on('timeupdate', onTimeUpdate), []);

  return {
    active,
    currentTime: active ? percent * ctx.duration : currentTime,
    onMouseDown: e => {
      if (isNaN(ctx.duration)) {
        console.error('isNaN(duration) === true');
        return;
      }

      if (!ref.current) {
        return;
      }

      draging(e);
      upStatus(true);
      window.addEventListener('mousemove', draging);
      window.addEventListener('mouseup', dragEnd);
      window.addEventListener('contextmenu', dragEnd);
    }
  }
}

export default function () {
  const ctx = useContext(Context);
  const wrap = useRef(null);
  const buffer = useBuffer(ctx);
  const {
    active,
    currentTime,
    onMouseDown
  } = useDragX(wrap);

  const timePer = currentTime ? currentTime / ctx.duration : 0;
  const offset = (timePer * 100) + '%';

  return (
    <div
      className={cls('chimee-controlbar__progress', {
        active
      })}
      onMouseDown={onMouseDown}
      ref={wrap}
    >
      <div
        className="chimee-controlbar__progress__buff"
        style={{ width: (buffer * 100) + '%' }}
      />
      <div
        className="chimee-controlbar__progress__play"
        style={{ width: offset }}
      />
      <div
        className="chimee-controlbar__progress__point"
        style={{ left: offset }}
      >
        <div
          className="chimee-controlbar__progress__point__text"
          onMouseDown={e => e.stopPropagation()}
        >{formatTime(currentTime)}</div>
        <div className="chimee-controlbar__progress__point__circle" />
      </div>
    </div>
  );
}