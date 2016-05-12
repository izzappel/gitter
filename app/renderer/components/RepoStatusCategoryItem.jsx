import React from 'react';

const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const RepoStatusCategoryItem = ({item, onFileDoubleClick, onDiff}) => {
  if (onDiff) {
    let menu = new Menu();
    menu.append(new MenuItem({label: 'Diff', click: onDiff}));

    let openContextMenu = () => menu.popup(remote.getCurrentWindow());

    return (<li onContextMenu={openContextMenu}><div onDoubleClick={onFileDoubleClick}>{item}</div><button onClick={onDiff}><i className="fa fa-history"></i></button></li>);
  } else {
    return (<li onDoubleClick={onFileDoubleClick}><div>{item}</div></li>);
  }
};

RepoStatusCategoryItem.propTypes = {
  item: React.PropTypes.string,
  onFileDoubleClick: React.PropTypes.func.isRequired,
  onDiff: React.PropTypes.func
};

export default RepoStatusCategoryItem;