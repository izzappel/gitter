import React from 'react';
import './../styles/RepoChooser.scss';
var RepoActions = require('../../main/actions/RepoActions');

export default class RepoChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      repo: ''
    };

    this.onDirectoryChoosen = this.onDirectoryChoosen.bind(this);
    this.onBrowseClick = this.onBrowseClick.bind(this);
  }

  onDirectoryChoosen(e) {
    var value = e.target.files[0].path;
    var directory = value.match(/(.*)\\(.*\..*)/);
    var repo = '';

    if (directory && directory[1]) {
      repo =  directory[1];
      RepoActions.setRepo(directory[1]);
    }

    this.setState({
      value: '',
      repo: repo
    });
  }

  onBrowseClick(e) {
    document.getElementById('repoDirectoryChooser').click();
  }

  render() {
    return <div className="chooser">
      <div className="selected-repo">{this.state.repo}</div>
      <div className="select-repo-button"><button type="button" onClick={this.onBrowseClick}><i className="fa fa-folder-open"></i></button></div>
      <input type="file" name="repoDirectory" id="repoDirectoryChooser" onChange={this.onDirectoryChoosen} value={this.state.value}/>
    </div>;
  }
}