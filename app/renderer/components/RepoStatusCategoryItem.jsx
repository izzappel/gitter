import React from 'react';
import './../styles/RepoStatusCategoryItem.scss';

const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const RepoStatusCategoryItem = ({item, onFileDoubleClick, onDiff, onRevert}) => {
  let menu = new Menu();
  let openContextMenu = () => menu.popup(remote.getCurrentWindow());
  let onDiffClickHandlerButton;
  let onRevertClickHanlderButton;

  if (onDiff) {
    menu.append(new MenuItem({label: 'Diff', click: onDiff}));
    onDiffClickHandlerButton = <button onClick={onDiff} title="Diff" className="status-list-action-button"><i className="fa fa-history"></i></button>;
  }

  if(onRevert) {
    menu.append(new MenuItem({label: 'Revert', click: onRevert}));
    onRevertClickHanlderButton = <button onClick={onRevert} title="Revert" className="status-list-action-button"><i className="fa fa-undo"></i></button>;
  }
  
  return (
    <li onContextMenu={openContextMenu}>
      <div onDoubleClick={onFileDoubleClick}>{item}</div>
      {onDiffClickHandlerButton}
      {onRevertClickHanlderButton}
    </li>);
};

RepoStatusCategoryItem.propTypes = {
  item: React.PropTypes.string,
  onFileDoubleClick: React.PropTypes.func.isRequired,
  onDiff: React.PropTypes.func,
  onRevert: React.PropTypes.func
};

export default RepoStatusCategoryItem;