import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';

import '@trutoo/ui-core/dist/components/Container/Container.css';

import 'index.css';

import { App } from './App/App';

const main = () => <App />;

/* Render hook for multiple of same the tapp */
document.querySelectorAll('main.root').forEach(element => {
  ReactDOM.render(main(), element);
  /*
  if (window.shouldRender) {
    ReactDOM.render(app(), element);
  } else {
    ReactDOM.hydrate(app(), element);
  }
  */
});

export default hot(main);
