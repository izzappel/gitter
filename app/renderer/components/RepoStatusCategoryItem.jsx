import React from 'react';

const RepoStatusCategoryItem = ({item, onFileDoubleClick}) => (
  <li onDoubleClick={onFileDoubleClick}>{item}</li>
);

RepoStatusCategoryItem.propTypes = {
  item: React.PropTypes.string,
  onFileDoubleClick: React.PropTypes.func.isRequired
};

export default RepoStatusCategoryItem;