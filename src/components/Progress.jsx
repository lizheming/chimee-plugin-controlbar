import React, { useContext, useRef, useState, useEffect } from 'react';
import cls from 'classnames';
import formatTime from '../utils/duration';
import Context from '../Context';

export default function () {
  const ctx = useContext(Context);
  const wrap = useRef(null);
  const [startX, upX] = useState(null);
  const [startTime, upTime] = useState(null);
  const [active, upStatus] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffer, setBuffer] = useState(0);
  useEffect(() => {
    function onProgress() {
      try {
        const buffer = ctx.buffered.end(0);
        setBuffer(buffer);
      } catch (e) {
        console.log(e);
      }
    }
    function onTimeUpdate() {
      setCurrentTime(ctx.currentTime);
    }
    ctx.$on('progress', onProgress);
    ctx.$on('timeupdate', onTimeUpdate);
    return () => {
      // ctx.$off('progress', onProgress);
      // ctx.$off('timeupdate', onTimeUpdate);
    };
  }, []);
  function draging(e) {
    const endX = e.clientX;
    const offsetWidth = wrap.current.offsetWidth;
    const dragTime = (endX - startX) / offsetWidth * ctx.duration;
    const dragAfterTime = +(startTime + dragTime).toFixed(2);
    const currentTime = Math.min(ctx.duration, Math.max(0, dragAfterTime));
    setCurrentTime(currentTime);
  }
  function dragEnd() {
    upX(null);
    upTime(null);
    ctx.currentTime = currentTime;
    setCurrentTime(undefined);
    upStatus(false);
    window.removeEventListener('mousemove', draging);
    window.removeEventListener('mouseup', dragEnd);
    window.removeEventListener('contextmenu', dragEnd);
  }
  function onMouseDown(e) {
    if (isNaN(ctx.duration)) {
      console.error('isNaN(duration) === true');
      return;
    }
    const pageX = wrap.current.getBoundingClientRect().x;
    const offsetWidth = wrap.current.offsetWidth;
    const time = (e.pageX - pageX) / offsetWidth * ctx.duration;
    upX(e.clientX);
    upTime(time);
    upStatus(true);
    window.addEventListener('mousemove', draging);
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('contextmenu', dragEnd);
  }
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
        style={{ width: (buffer / ctx.duration * 100) + '%' }}
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