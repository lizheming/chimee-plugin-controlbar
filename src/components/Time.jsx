import React, { useContext, useState, useEffect } from 'react';

import Context from '../Context';
import formatTime from '../utils/duration';

export default function () {
  const ctx = useContext(Context);

  const [dur, setDur] = useState('00:00');
  const [cur, setCur] = useState('00:00');

  const upTime = () => {
    setDur(formatTime(ctx.duration));
    setCur(formatTime(ctx.currentTime));
  };

  useEffect(() => {
    ctx.$on('load', upTime);
    ctx.$on('timeupdate', upTime);
    return () => {
    };
  }, []);

  return (
    <div className="chimee-controlbar__play--time">
      <span className="chimee-controlbar__play--time__passed">{cur}</span>
      <span className="chimee-controlbar__play--time__spliter">/</span>
      <span className="chimee-controlbar__play--time__total">{dur}</span>
    </div>
  )
}