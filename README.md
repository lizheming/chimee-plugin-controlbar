# chimee-plugin-controlbar

Plugin take controlbar to Chimee video player. https://lizheming.github.io/chimee-plugin-controlbar

## Install

```bash
npm install @lizheming/chimee-plugin-controlbar
```

## How To Use

### UMD

```html
<script src="https://lib.baomitu.com/chimee/2.0.0-alpha.3/index.browser.js"></script>
<script src="/dist/chimee-controlbar.umd.min.js"></script>
<script>
  Chimee.install(ChimeePluginControlbar);
  var player = new Chimee({
    width: 900,
    height: 492,
    wrapper: '.chimee-container',
    src: location.protocol + '//chimee.org/vod/1.mp4',
    isLive: false,
    box: 'native',
    autoplay: false,
    controls: false,
    plugin: [ChimeePluginControlbar.name]
  });
</script>
```

### Webpack

First you should add alias to webpack config:

```js
resolve: {
  alias: {
    '@lizheming/chimee-plugin-controlbar': '@lizheming/chimee-plugin-controlbar/dist/chimee-plugin-controlbar.umd.min.js'
  }
}
```

Then you can use:

```js
import Chimee from 'chimee';
import ChimeePluginControlbar from '@lizheming/chimee-plugin-controlbar';

// install plugin
Chimee.install(ChimeePluginControlbar);
const player = new Chimee({
  plugin: [ChimeePluginControlbar.name]
});
```

## Configuration

### onNext

If you config `onNext` with function, a next button will show in player. 

```js

const player = new Chimee({
  plugin: [{
    name: ChimeePluginControlbar.name,
    onNext() {
      // play next video or other action
      console.log('next')
    }
  }]
});
```

### render

If you want to custom html, you can use render function by React.

```jsx
import React, {useContext} from 'react;
import ChimeePluginControlbar from '@lizheming/chimee-plugin-controlbar';

const {Progress, Play, Next, Time, PlaybackRate, Volume, FullScreen} = ChimeePluginControlbar.Plugins;
const Context = ChimeePluginControlbar.Context;

function CustomButton() {
  const ctx = useContext(Context);
  return (
    <span>
      Volume: {Math.round(ctx.volume * 100) + '%'}
    </span>
  );
}

const player = new Chimee({
  plugin: [{
    name: ChimeePluginControlbar.name,
    render() {
      return (
        <>
          <Progress />
          <div className="chimee-controlbar__groups">
            <div className="chimee-controlbar__float--left">
              <Play />
              <Next />
              <Time />
              <CustomButton />
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
  }]
});
```

