var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _repo = null;

function setRepo(directory) {
  _repo = directory;
}

var RepoStore = assign({}, EventEmitter.prototype, {
  getRepo: function () {
    return _repo;
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action;
    var text;

    switch (action.actionType) {
      case 'SET_REPO':
        text = action.text.trim();
        if (text !== '') {
          setRepo(text);
          RepoStore.emitChange();
        }
        break;
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })
});

module.exports = RepoStore;