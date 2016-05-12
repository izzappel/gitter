import React from 'react';
import { connect } from 'react-redux';
import './../styles/RepoLog.scss';

const RepoLog = ({ log }) => {
  return (
    <div className="log">
      <pre>{log}</pre>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    log: state.log
  };
}

export default connect(mapStateToProps)(RepoLog);