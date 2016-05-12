import { SET_REPO, SET_STATE, SET_LOG } from '../actions/ActionTypes';

const initialState = {
  repo: '',
  state: {
    worktree: {
      modified: [],
      deleted: [],
      untracked: [],
      renamed: []
    },
    index: {
      modified: [],
      deleted: [],
      added: [],
      renamed: []
    }
  },
  log: ''
};

export default function repo(state = initialState, action) {
  var newState;
  switch (action.type) {
    case SET_REPO:
      newState = Object.assign({}, state, { repo: action.repo });
      return newState;
    case SET_STATE:
      newState =  Object.assign({}, state, {state: action.state });
      return newState;
    case SET_LOG:
      newState =  Object.assign({}, state, {log: action.log});
      return newState;
    default:
      return state;
  }
}