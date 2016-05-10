import React from 'react';
var simpleGit = require('simple-git');
var gitRepo = simpleGit();

export default class RepoStatusList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conflicted: [],
      created: [],
      deleted: [],
      modified: [],
      not_added: []
    };
  }

  componentDidMount() {
    gitRepo.status(function (error, result) {
      console.log(result);
      this.setState(result);
    }.bind(this));
  }

  render() {
    return <span>Number of modified files: {this.state.modified.length}</span>;
  }
}