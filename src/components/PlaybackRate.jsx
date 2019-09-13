import React, { useContext, useState, useEffect, useCallback } from 'react';
import cls from 'classnames';

import Context from '../Context';

const RATES = [
  { value: 0.5, text: '0.5x' },
  { value: 1, text: '1.0x' },
  { value: 1.25, text: '1.25x' },
  { value: 1.5, text: '1.5x' },
  { value: 2, text: '2x' }
];
let RATE = 1;

export default function () {
  const ctx = useContext(Context);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    // 同步修改 playbackRate 不生效，所以包裹在 setTimeout 异步中
    setTimeout(() => {
      ctx.playbackRate = RATE;
    }, 10);
  }, []);

  const select = useCallback(value => {
    if (value === rate) {
      return;
    }

    ctx.playbackRate = value;
    RATE = value;
    setRate(RATE);
  }, []);

  return (
    <div className="chimee-controlbar__playback-rate">
      <div className="chimee-controlbar__playback-rate__list__container">
        <ul className="chimee-controlbar__playback-rate__list">
          {RATES.map(({ value, text }) => (
            <li
              key={value}
              onClick={() => select(value)}
              className={cls({ active: value === rate || (rate === null && value === 1) })}
            >{text}</li>
          ))}
        </ul>
      </div>
      <div className="chimee-controlbar__playback-rate__text">
        {rate === null ? '倍数' : RATES.find(({ value }) => value === rate).text}
      </div>
    </div>
  )
}