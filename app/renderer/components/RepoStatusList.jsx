import React from 'react';
import { connect } from 'react-redux';
import { updateState } from '../../main/actions/RepoActionCreator';
import RepoStatusCategory from './RepoStatusCategory';
import './../styles/RepoStatusList.scss';
var simpleGit = require('../../git/simple-git');

class RepoStatusList extends React.Component {
  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
  }

  addToIndex(item) {
    this.props.repo.add(item, (error, result) => {
      this.updateState();
    });
  }

  removeFromIndex(item) {
    this.props.repo.reset(['HEAD', item], (error, result) => {
      this.updateState();
    });
  }

  updateState() {
    this.props.dispatch(updateState(this.props.repoDirectory));
  }

  render() {
    return <div className="status-list">
      <div className="worktree">
        <h1>Working Tree</h1>
        <RepoStatusCategory className="modified" title="Modified" onFileDoubleClick={(item) => this.addToIndex(item)} files={this.props.state.worktree.modified}/>
        <RepoStatusCategory className="deleted" title="Deleted" onFileDoubleClick={(item) => this.addToIndex(item)} files={this.props.state.worktree.deleted}/>
        <RepoStatusCategory className="untracked" title="Untracked" onFileDoubleClick={(item) => this.addToIndex(item)} files={this.props.state.worktree.untracked}/>
        <RepoStatusCategory className="renamed" title="Reanmed" onFileDoubleClick={(item) => this.addToIndex(item)} files={this.props.state.worktree.renamed}/>
      </div>
      <div className="index">
        <h1>Index</h1>
        <RepoStatusCategory className="modified" title="Modified" onFileDoubleClick={(item) => this.removeFromIndex(item)} files={this.props.state.index.modified}/>
        <RepoStatusCategory className="deleted" title="Deleted" onFileDoubleClick={(item) => this.removeFromIndex(item)} files={this.props.state.index.deleted}/>
        <RepoStatusCategory className="added" title="Added" onFileDoubleClick={(item) => this.removeFromIndex(item)} files={this.props.state.index.added}/>
        <RepoStatusCategory className="renamed" title="Reanmed" onFileDoubleClick={(item) => this.removeFromIndex(item)} files={this.props.state.index.renamed}/>
      </div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    repo: simpleGit(state.repo),
    repoDirectory: state.repo,
    state: state.state
  };
}

export default connect(mapStateToProps)(RepoStatusList);