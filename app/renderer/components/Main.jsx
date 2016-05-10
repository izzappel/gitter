import React from 'react';
import './../styles/Main.scss';
import Headline from './Headline';
import RepoStatusList from './RepoStatusList';

var png = require("file?name=[name].[ext]!../public/images/GitHub-Mark-32px.png");

export default class Main extends React.Component {
  render() {
    return (<div className="container">
        <h1>Gitter</h1>
        <RepoStatusList />
      </div>
    );
  }
}