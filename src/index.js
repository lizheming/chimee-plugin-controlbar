import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import Context from './Context';

export default {
  name: 'controlbar',
  inner: true,
  el: `<div class="chimee-controlbar"></div>`,
  create() {
    ReactDOM.render(
      <Context.Provider value={this}>
        <App />
      </Context.Provider>,
      this.$dom
    );
  }
};