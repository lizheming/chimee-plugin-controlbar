import React, { useContext, useState, useEffect } from 'react';
import Context from '../Context';
const Button = {
  Play() {
    const ctx = useContext(Context);
    function onPlay() {
      ctx.$emit('play');
    }
    return (
      <div className="chimee-controlbar__play" onClick={onPlay}>
        <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <path d="M15.1797235,10.5406093 L3.53083201,17.8370951 C3.06278334,18.1302655 2.44569335,17.9884987 2.15252293,17.52045 C2.05285722,17.361333 2,17.1773718 2,16.989618 L2,1.01859462 C2,0.466309874 2.44771525,0.018594624 3,0.018594624 C3.18821633,0.018594624 3.3726117,0.0717124216 3.53198464,0.171840618 L15.1817983,7.49099332 C16.023567,8.01984592 16.2772357,9.13095409 15.7483831,9.97272288 C15.6040504,10.2024557 15.4096525,10.3965893 15.1797235,10.5406093 Z"></path>
        </svg>
      </div>
    );
  },
  Pause() {
    const ctx = useContext(Context);
    function onPause() {
      ctx.$emit('pause');
    }
    return (
      <div className="chimee-controlbar__pause" onClick={onPause}>
        <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="pause">
            <path d="M14.5,0 L14.5,0 C15.3284271,-1.52179594e-16 16,0.671572875 16,1.5 L16,16.5 C16,17.3284271 15.3284271,18 14.5,18 L14.5,18 C13.6715729,18 13,17.3284271 13,16.5 L13,1.5 C13,0.671572875 13.6715729,1.52179594e-16 14.5,0 Z"></path>
            <path d="M3.5,0 L3.5,0 C4.32842712,-1.52179594e-16 5,0.671572875 5,1.5 L5,16.5 C5,17.3284271 4.32842712,18 3.5,18 L3.5,18 C2.67157288,18 2,17.3284271 2,16.5 L2,1.5 C2,0.671572875 2.67157288,1.52179594e-16 3.5,0 Z"></path>
          </g>
        </svg>
      </div>
    );
  }
};
export default function () {
  const ctx = useContext(Context);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    ctx.$on('play', () => setPlay(true));
    ctx.$on('pause', () => setPlay(false));
    return () => {
    };
  }, []);
  return (
    <div className="chimee-controlbar__button chimee-controlbar__play--state">
      {play ? <Button.Pause /> : <Button.Play />}
    </div>
  );
}