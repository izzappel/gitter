import React from 'react';
import './../styles/RepoStatusList.scss';
import RepoStatusCategory from './RepoStatusCategory';
var simpleGit = require('../../git/simple-git');
var gitRepo = simpleGit();

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
  }

  componentDidMount() {
    gitRepo.status(function (error, result) {
      console.log(result);
      this.setState(result);
    }.bind(this));
  }

  render() {
    return <div className="status-list">
      <div className="worktree">
        <h1>Working Tree</h1>
        <RepoStatusCategory className="modified" title="Modified" files={this.state.worktree.modified}/>
        <RepoStatusCategory className="deleted" title="Deleted" files={this.state.worktree.deleted}/>
        <RepoStatusCategory className="untracked" title="Untracked" files={this.state.worktree.untracked}/>
        <RepoStatusCategory className="renamed" title="Reanmed" files={this.state.worktree.renamed}/>
      </div>
      <div className="index">
        <h1>Index</h1>
        <RepoStatusCategory className="modified" title="Modified" files={this.state.index.modified}/>
        <RepoStatusCategory className="deleted" title="Deleted" files={this.state.index.deleted}/>
        <RepoStatusCategory className="added" title="Added" files={this.state.index.added}/>
        <RepoStatusCategory className="renamed" title="Reanmed" files={this.state.index.renamed}/>
      </div>
    </div>;
  }
}