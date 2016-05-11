import React from 'react';
import './../styles/RepoLog.scss';
var RepoStore = require('../../main/stores/RepoStore');
var RepoActions = require('../../main/actions/RepoActions');
var simpleGit = require('../../git/simple-git');

function getRepo() {
  return simpleGit(RepoStore.getRepo());
}

export default class RepoLog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      log: ''
    };

    this.updateLog = this.updateLog.bind(this);
  }

  componentDidMount() {
    RepoStore.addChangeListener(this.updateLog);

    this.updateLog();
  }

  componentWillUnmount() {
    RepoStore.removeChangeListener(this.updateLog);
  }

  updateLog() {
    getRepo().myLog((error, result) => {
      this.setState({
        log: result
      })
    });
  }

  render() {
    return <div className="log">
      <pre>{this.state.log}</pre>
    </div>;
  }
}