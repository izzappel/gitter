import React from 'react';
var simpleGit = require('simple-git')();

simpleGit.status(function(error, result) {
   console.log(result);
});

export default class RepoList extends React.Component {
    render() {
        return <span>Repo</span>;
    }
}