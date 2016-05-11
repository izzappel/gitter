var AppDispatcher = require('../dispatcher/AppDispatcher');

var RepoActions = {
  setRepo: function(directory) {
    AppDispatcher.handleViewAction({
      actionType: 'SET_REPO',
      text: directory
    });
  }
};

module.exports = RepoActions;