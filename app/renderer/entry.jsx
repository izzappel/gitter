// Need both React and ReactDOM for the JSX transpiler.
import thunkMiddleware from 'redux-thunk';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import repo from '../main/reducers/Repo';
import RepoWatcher from '../main/services/RepoWatcher';

import Main from './components/Main';

let store = createStore(repo, applyMiddleware(thunkMiddleware));
let watcher = new RepoWatcher(store);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
document.getElementById('react-root')
);