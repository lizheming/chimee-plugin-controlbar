import React, { useContext } from 'react';

import Context from '../Context';

export default function () {
  const ctx = useContext(Context);

  if (typeof ctx.$config.onNext !== 'function') {
    return null;
  }

  return (
    <div className="chimee-controlbar__button chimee-controlbar__play--next">
      <div
        className="chimee-controlbar__play--next_button"
        onClick={() => ctx.$config.onNext()}
      >
        <svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="next">
            <path d="M11.3533375,10.1853738 L1.5320776,16.3572169 C1.06446053,16.6510753 0.447162748,16.510216 0.153304405,16.042599 C0.0531388518,15.8832054 -8.30216278e-14,15.698775 -8.30446822e-14,15.5105214 L-8.23785484e-14,2.48947865 C-8.24461838e-14,1.9371939 0.44771525,1.48947865 1,1.48947865 C1.18825366,1.48947865 1.37268406,1.5426175 1.5320776,1.64278305 L11.3533375,7.81462617 C12.0080014,8.22602785 12.2052044,9.09024475 11.7938027,9.74490864 C11.6819217,9.92294502 11.5313739,10.0734928 11.3533375,10.1853738 Z"></path>
            <path d="M16.5,0 L16.5,0 C17.3284271,-1.52179594e-16 18,0.671572875 18,1.5 L18,16.5 C18,17.3284271 17.3284271,18 16.5,18 L16.5,18 C15.6715729,18 15,17.3284271 15,16.5 L15,1.5 C15,0.671572875 15.6715729,1.52179594e-16 16.5,0 Z"></path>
          </g>
        </svg>
      </div>
    </div>
  );
}