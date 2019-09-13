import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Context from './Context';

import FullScreen from './components/FullScreen';
import Next from './components/Next';
import Play from './components/Play';
import PlaybackRate from './components/PlaybackRate';
import Progress from './components/Progress';
import Time from './components/Time';
import Volume from './components/Volume';

export default {
  Context,
  Plugins: {
    FullScreen,
    Next,
    Play,
    PlaybackRate,
    Progress,
    Time,
    Volume
  },
  name: 'controlbar',
  inner: true,
  el: `<div class="chimee-controlbar"></div>`,
  create() {
    let Main = App;
    if (typeof this.$config.render === 'function') {
      Main = this.$config.render;
    }

    ReactDOM.render(
      <Context.Provider value={this}>
        <Main />
      </Context.Provider>,
      this.$dom
    );
  },
  events: {
    keydown(e) {
      // if(this.disabled) return;
      e.stopPropagation();
      switch (e.keyCode) {
        case 32: {
          e.preventDefault();
          this.paused ? this.play() : this.pause();
          break;
        }
        case 37: {
          e.preventDefault();
          const reduceTime = this.currentTime - 10;
          this.currentTime = reduceTime < 0 ? 0 : reduceTime;
          break;
        }
        case 39: {
          e.preventDefault();
          const raiseTime = this.currentTime + 10;
          this.currentTime = raiseTime > this.duration ? this.duration : raiseTime;
          break;
        }
        case 38: {
          e.preventDefault();
          const raiseVolume = this.volume + 0.1;
          this.volume = raiseVolume > 1 ? 1 : raiseVolume;
          break;
        }
        case 40: {
          e.preventDefault();
          const reduceVolume = this.volume - 0.1;
          this.volume = reduceVolume < 0 ? 0 : reduceVolume;
          break;
        }
      }
    },
    click() {
      const time = new Date();
      const preTime = this.clickTime;
      this.clickTime = time;
      if (time - preTime < 300) {
        clearTimeout(this.clickTimeId);
        return;
      }
      this.clickTimeId = setTimeout(() => {
        this.paused ? this.play() : this.pause();
      }, 300);
    },
    dblclick() {
      this.$fullscreen(!this.isFullscreen, 'container');
    }
  }
};