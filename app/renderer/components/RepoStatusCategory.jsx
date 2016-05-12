import React from 'react';
import RepoStatusCategoryItem from './RepoStatusCategoryItem';
import './../styles/RepoStatusCategory.scss';

const RepoStatusCategory = ({className, title, files, onFileDoubleClick, onDiff}) => {
  return (
    <div className={className}>
      <ul className="status-category-list">
        {files.map((item, i) => {
            if (onDiff) {
              return (<RepoStatusCategoryItem item={item} onFileDoubleClick={() => onFileDoubleClick(item)} onDiff={() => onDiff(item)} />);
            } else {
              return (<RepoStatusCategoryItem item={item} onFileDoubleClick={() => onFileDoubleClick(item)} />);
            }
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
  onDiff: React.PropTypes.func
};

export default RepoStatusCategory;