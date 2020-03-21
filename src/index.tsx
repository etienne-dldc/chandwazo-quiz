import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider as SelectProvider } from './select';
import { App } from './components/App';
import store from './store';

ReactDOM.render(
  <SelectProvider store={store}>
    <App />
  </SelectProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
