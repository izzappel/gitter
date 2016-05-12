import React from 'react';
import './../styles/Main.scss';
import RepoStatusList from './RepoStatusList';
import RepoLog from './RepoLog';
import RepoChooser from './RepoChooser';

var png = require("file?name=[name].[ext]!../public/images/GitHub-Mark-32px.png");

export default class Main extends React.Component {
  render() {
    return (<div className="container">
        <RepoChooser />
        <RepoLog />
        <RepoStatusList />
      </div>
    );
  }
}