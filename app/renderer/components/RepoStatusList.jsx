import React from 'react';
import { connect } from 'react-redux';
import { updateState } from '../../main/actions/RepoActionCreator';
import RepoStatusCategory from './RepoStatusCategory';
import SplitPane from 'react-split-pane';
import './../styles/Splitter.scss';

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
  
  addRemovedToIndex(item) {
    this.props.repo.rm(item, (error, result) => {
      this.updateState();
    });
  }

  removeFromIndex(item) {
    this.props.repo.reset(['HEAD', item], (error, result) => {
      this.updateState();
    });
  }

  openWorkingTreeDiff(item) {
    this.props.repo.diffWorkingtree(item);
  }

  openIndexDiff(item) {
    this.props.repo.diffIndex(item);
  }
  
  revertWorkingTreeFile(item) {
	 this.props.repo.revertChanges(item, (error, result) => {
      this.updateState();
    });
  }

  updateState() {
    this.props.dispatch(updateState(this.props.repoDirectory));
  }

  render() {
    return (<div className="status-list">
      <SplitPane split="horizontal"  defaultSize="50%">
        <div className="worktree">
          <h1>Working Tree</h1>
          <RepoStatusCategory className="modified" title="Modified" 
          		onFileDoubleClick={(item) => this.addToIndex(item)} 
          		files={this.props.state.worktree.modified} 
          		onDiff={(item) => this.openWorkingTreeDiff(item)}
          		onRevert={(item) => this.revertWorkingTreeFile(item)}/>
          		
          <RepoStatusCategory className="deleted" title="Deleted" 
          		onFileDoubleClick={(item) => this.addRemovedToIndex(item)} 
          		files={this.props.state.worktree.deleted} 
          		onRevert={(item) => this.revertWorkingTreeFile(item)}/>
          		
          <RepoStatusCategory className="untracked" title="Untracked" 
          		onFileDoubleClick={(item) => this.addToIndex(item)} 
          		files={this.props.state.worktree.untracked}/>
          		
          <RepoStatusCategory className="renamed" title="Renamed" 
          		onFileDoubleClick={(item) => this.addToIndex(item)} 
          		files={this.props.state.worktree.renamed} 
          		onDiff={(item) => this.openWorkingTreeDiff(item)}
          		onRevert={(item) => this.revertWorkingTreeFile(item)}/>
        </div>
        
        <div className="index">
          <h1>Index</h1>
          <RepoStatusCategory className="modified" title="Modified" 
          		onFileDoubleClick={(item) => this.removeFromIndex(item)} 
          		files={this.props.state.index.modified} 
          		onDiff={(item) => this.openIndexDiff(item)}/>
          		
          <RepoStatusCategory className="deleted" title="Deleted" 
          		onFileDoubleClick={(item) => this.removeFromIndex(item)} 
          		files={this.props.state.index.deleted} 
          		onDiff={(item) => this.openIndexDiff(item)}/>
          		
          <RepoStatusCategory className="added" title="Added" 
          		onFileDoubleClick={(item) => this.removeFromIndex(item)} 
          		files={this.props.state.index.added} 
          		onDiff={(item) => this.openIndexDiff(item)}/>
          		
          <RepoStatusCategory className="renamed" title="Renamed" 
          		onFileDoubleClick={(item) => this.removeFromIndex(item)} 
          		files={this.props.state.index.renamed} 
          		onDiff={(item) => this.openIndexDiff(item)}/>
        </div>
      </SplitPane>
    </div>);
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