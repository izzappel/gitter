import React from 'react';
import './../styles/RepoStatusCategory.scss';

export default class RepoStatusCategory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={this.props.className}>
      <ul className="status-category-list">
        {this.props.files.map((item, i) =>
          <li onDoubleClick={this.props.onFileDoubleClick.bind(this, item)}>{item}</li>
        )}
      </ul>
    </div>;
  }
}

RepoStatusCategory.propTypes = {files: React.PropTypes.array};