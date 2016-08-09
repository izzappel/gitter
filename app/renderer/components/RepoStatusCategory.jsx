import React from 'react';
import RepoStatusCategoryItem from './RepoStatusCategoryItem';
import './../styles/RepoStatusCategory.scss';

const {remote} = require('electron');
const {dialog} = remote;

const RepoStatusCategory = ({className, title, files, onFileDoubleClick, onDiff, onRevert}) => {
  let revertWithConfirmation = function(item) {
    let options = {
      type: 'question',
      message: 'Are you sure you want to revert the changes?',
      title: 'Revert changes',
      buttons: ['Yes', 'No']
    };

    dialog.showMessageBox(remote.getCurrentWindow(), options, (response) => onConfirmationDialogClosed(response, item));
  };

  let onConfirmationDialogClosed = function (response, item) {
    if(response === 0) {
      onRevert(item);
    }
  };

  return (
    <div className={className}>
      <ul className="status-category-list">
        {files.map((item, i) => {
          let opts = {};
          
          if(onDiff) {
            opts['onDiff'] = () => onDiff(item);
          }

          if(onRevert) {
            opts['onRevert'] = () => revertWithConfirmation(item);
          }

          return (<RepoStatusCategoryItem key={item} item={item} onFileDoubleClick={() => onFileDoubleClick(item)} {...opts}/>);
          }
        )}
      </ul>
    </div>
  );
};

RepoStatusCategory.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  files: React.PropTypes.array,
  onFileDoubleClick: React.PropTypes.func.isRequired,
  onDiff: React.PropTypes.func,
  onRevert: React.PropTypes.func
};

export default RepoStatusCategory;