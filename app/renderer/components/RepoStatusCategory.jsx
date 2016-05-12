import React from 'react';
import RepoStatusCategoryItem from './RepoStatusCategoryItem';
import './../styles/RepoStatusCategory.scss';

const RepoStatusCategory = ({className, title, files, onFileDoubleClick}) => (
  <div className={className}>
    <ul className="status-category-list">
      {files.map((item, i) =>
        <RepoStatusCategoryItem  item={item} onFileDoubleClick={() => onFileDoubleClick(item)} />
      )}
    </ul>
  </div>
);

RepoStatusCategory.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  files: React.PropTypes.array,
  onFileDoubleClick: React.PropTypes.func.isRequired
};

export default RepoStatusCategory;