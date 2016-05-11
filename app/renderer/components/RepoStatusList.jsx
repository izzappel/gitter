import React from 'react';
import './../styles/RepoStatusList.scss';
import RepoStatusCategory from './RepoStatusCategory';
var RepoStore = require('../../main/stores/RepoStore');
var simpleGit = require('../../git/simple-git');

function getRepo() {
  return simpleGit(RepoStore.getRepo());
}

export default class RepoStatusList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: {
        deleted: [],
        modified: [],
        renamed: [],
        copied: [],
        added: []
      },

      worktree: {
        untracked: [],
        deleted: [],
        modified: [],
        renamed: [],
        copied: []
      }
    };

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState();
    RepoStore.addChangeListener(this.updateState);
  }

  componentWillUnmount() {
    RepoStore.removeChangeListener(this.updateState);
  }

  addToIndex(item) {
    getRepo().add(item, function(error, result) {
      this.updateState();
    }.bind(this));
  }

  removeFromIndex(item) {
    getRepo().reset(['HEAD', item], function(error, result) {
      this.updateState();
    }.bind(this));
  }

  updateState() {
    getRepo().status((error, result) => {
      this.setState(result);
    });
  }

  render() {
    return <div className="status-list">
      <div className="worktree">
        <h1>Working Tree</h1>
        <RepoStatusCategory className="modified" title="Modified" onFileDoubleClick={(item) => this.addToIndex(item)} files={this.state.worktree.modified}/>
        <RepoStatusCategory className="deleted" title="Deleted" onFileDoubleClick={(item) => this.addToIndex(item)} files={this.state.worktree.deleted}/>
        <RepoStatusCategory className="untracked" title="Untracked" onFileDoubleClick={(item) => this.addToIndex(item)} files={this.state.worktree.untracked}/>
        <RepoStatusCategory className="renamed" title="Reanmed" onFileDoubleClick={(item) => this.addToIndex(item)} files={this.state.worktree.renamed}/>
      </div>
      <div className="index">
        <h1>Index</h1>
        <RepoStatusCategory className="modified" title="Modified"  onFileDoubleClick={(item) => this.removeFromIndex(item)} files={this.state.index.modified}/>
        <RepoStatusCategory className="deleted" title="Deleted"  onFileDoubleClick={(item) => this.removeFromIndex(item)} files={this.state.index.deleted}/>
        <RepoStatusCategory className="added" title="Added"  onFileDoubleClick={(item) => this.removeFromIndex(item)} files={this.state.index.added}/>
        <RepoStatusCategory className="renamed" title="Reanmed"  onFileDoubleClick={(item) => this.removeFromIndex(item)} files={this.state.index.renamed}/>
      </div>
    </div>;
  }
}