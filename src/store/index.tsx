import React from 'react';
import { supportReactHooks, render, createElement } from 'democrat';
import { AppStore } from './AppStore';
import { Store } from 'react-electors';

supportReactHooks(React);

export type AppState = ReturnType<typeof AppStore>;
export type AppStore = Store<AppState>;

const store: AppStore = render(createElement(AppStore));

(window as any).store = store;

export default store;
