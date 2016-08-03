import React from 'react';
import RepoStatusCategoryItem from './RepoStatusCategoryItem';
import './../styles/RepoStatusCategory.scss';

const RepoStatusCategory = ({className, title, files, onFileDoubleClick, onDiff, onRevert}) => {
  return (
    <div className={className}>
      <ul className="status-category-list">
        {files.map((item, i) => {
          let opts = {};
          
          if(onDiff) {
            opts['onDiff'] = () => onDiff(item);
          }

          if(onRevert) {
            opts['onRevert'] = () => onRevert(item);
          }

          return (<RepoStatusCategoryItem item={item} onFileDoubleClick={() => onFileDoubleClick(item)} {...opts}/>);
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