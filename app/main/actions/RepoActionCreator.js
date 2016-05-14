import { SET_REPO, SET_STATE, SET_LOG } from './ActionTypes';
var simpleGit = require('../../git/simple-git');

export function changeRepo(directory) {
  return function (dispatch) {
    dispatch(setRepo(directory));

    var repo = simpleGit(directory);

    repo.status((error, result) => {
      dispatch(setState(result));
    });

    repo.myLog((error, result) => {
      dispatch(setLog(result));
    });
  };
}

export function updateState(repoDir) {
  return function (dispatch) {
    var repo = simpleGit(repoDir);

    repo.status((error, result) => {
      dispatch(setState(result));
    });
  };
}

export function refreshRepo(repoDir) {
  return function (dispatch) {
    var repo = simpleGit(repoDir);

    repo.status((error, result) => {
      dispatch(setState(result));
    });

    repo.myLog((error, result) => {
      dispatch(setLog(result));
    });
  };
}

function setRepo(directory) {
  return {
    type: SET_REPO,
    repo: directory
  };
}

function setState(state) {
  return {
    type: SET_STATE,
    state: state
  };
}

export function setLog(log) {
  return {
    type: SET_LOG,
    log: log
  };
}
