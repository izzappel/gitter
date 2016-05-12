import { updateState } from '../../main/actions/RepoActionCreator';

export default class RepoWatcher {
  constructor(store) {
    this.store = store;

    store.subscribe(() => this.watch());
  }

  watch() {
    var state = this.store.getState();
    if (this.interval) {
      clearInterval(this.interval);
    }

    if(state.repo) {
      this.interval = setInterval(() => this.update(state.repo), 1000);
    }
  }

  update(repo) {
    this.store.dispatch(updateState(repo));
  }
}