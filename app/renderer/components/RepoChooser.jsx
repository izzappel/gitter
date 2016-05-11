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

  render() {
    return <div className="chooser">
      <div className="repo">{this.state.repo}</div>
      <input type="file" name="repoDirectory" onChange={this.onDirectoryChoosen} value={this.state.value}/>
    </div>;
  }
}