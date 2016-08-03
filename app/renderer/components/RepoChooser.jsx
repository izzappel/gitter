import React from 'react';
import { connect } from 'react-redux';
import { changeRepo, refreshRepo } from '../../main/actions/RepoActionCreator';
import './../styles/RepoChooser.scss';

class RepoChooser extends React.Component {
  constructor(props) {
    super(props);

    this.onDirectoryChoosen = this.onDirectoryChoosen.bind(this);
    this.onBrowseClick = this.onBrowseClick.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onDirectoryChoosen(e) {
    var value = e.target.files[0].path;
    
    var directory = value.match(/(.*)\/(.*\..*)/);
    if(!directory) {
	    directory = value.match(/(.*)\\(.*\..*)/); // try for windows
    }

    if (directory && directory[1]) {
      this.props.dispatch(changeRepo(directory[1]));
    }
  }

  onRefresh() {
    this.props.dispatch(refreshRepo(this.props.repo));
  }

  onBrowseClick(e) {
    document.getElementById('repoDirectoryChooser').click();
  }

  render() {
    return <div className="chooser">
      <div className="selected-repo">{this.props.repo}</div>
      <div className="reload-repo"><button type="button" onClick={this.onRefresh}><i className="fa fa-refresh"></i></button></div>
      <div className="select-repo-button"><button type="button" onClick={this.onBrowseClick}><i className="fa fa-folder-open"></i></button></div>
      <input type="file" name="repoDirectory" id="repoDirectoryChooser" onChange={this.onDirectoryChoosen}/>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    repo: state.repo
  };
}

export default connect(mapStateToProps)(RepoChooser);