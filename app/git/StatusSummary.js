
module.exports = StatusSummary;

/**
 * The StatusSummary is returned as a response to getting `git().status()`
 *
 * @constructor
 */
function StatusSummary () {
   this.index = {
      deleted: [],
      modified: [],
      renamed: [],
      copied: [],
      added: []
   };

   this.worktree = {
      untracked: [],
      deleted: [],
      modified: [],
      renamed: [],
      copied: []
   };

   this.conflicted= [];
}

/**
 * Number of commits ahead of the tracked branch
 * @type {number}
 */
StatusSummary.prototype.ahead = 0;

/**
 * Number of commits behind the tracked branch
 * @type {number}
 */
StatusSummary.prototype.behind = 0;

/**
 * Name of the current branch
 * @type {null}
 */
StatusSummary.prototype.current = null;

/**
 * Name of the branch being tracked
 * @type {string}
 */
StatusSummary.prototype.tracking = null;

/**
 * Gets whether this StatusSummary represents a clean working branch.
 *
 * @return {boolean}
 */
StatusSummary.prototype.isClean = function () {
   return 0 === Object.keys(this.worktree).filter(function (name) {
      return Array.isArray(this.worktree[name]) && this.worktree[name].length;
   }, this).length;
};

StatusSummary.parsers = {
   '##': function (line, status) {
      var aheadReg = /ahead (\d+)/;
      var behindReg = /behind (\d+)/;
      var currentReg = /^([^\s\.]*)\.*/;
      var trackingReg = /\.{3}(\S*)/;
      var regexResult;

      regexResult = aheadReg.exec(line);
      status.ahead = regexResult && +regexResult[1] || 0;

      regexResult = behindReg.exec(line);
      status.behind = regexResult && +regexResult[1] || 0;

      regexResult = currentReg.exec(line);
      status.current = regexResult && regexResult[1];

      regexResult = trackingReg.exec(line);
      status.tracking = regexResult && regexResult[1];
   },

   '??': function (line, status) {
      status.worktree.untracked.push(line);
   },

   'MM': function (line, status) {
      status.index.modified.push(line);
      status.worktree.modified.push(line);
   },
   'MD': function (line, status) {
      status.index.modified.push(line);
      status.worktree.deleted.push(line);
   },
   'M ': function (line, status) {
      status.index.modified.push(line);
   },
   'AM': function (line, status) {
      status.index.added.push(line);
      status.worktree.modified.push(line);
   },
   'AD': function (line, status) {
      status.index.added.push(line);
      status.worktree.deleted.push(line);
   },
   'A ': function (line, status) {
      status.index.added.push(line);
   },
   'DM': function (line, status) {
      status.index.deleted.push(line);
      status.worktree.modified.push(line);
   },
   'D ': function (line, status) {
      status.index.deleted.push(line);
   },
   'RM': function (line, status) {
      status.index.renamed.push(line);
      status.worktree.modified.push(line);
   },
   'RD': function (line, status) {
      status.index.renamed.push(line);
      status.worktree.deleted.push(line);
   },
   'R ': function (line, status) {
      status.index.renamed.push(line);
   },
   'CM': function (line, status) {
      status.index.copied.push(line);
      status.worktree.modified.push(line);
   },
   'CD': function (line, status) {
      status.index.copied.push(line);
      status.worktree.deleted.push(line);
   },
   'C ': function (line, status) {
      status.index.copied.push(line);
   },
   ' M': function (line, status) {
      status.worktree.modified.push(line);
   },
   ' D': function (line, status) {
      status.worktree.deleted.push(line);
   },

   UU: function (line, status) {
      status.conflicted.push(line);
   }
};

StatusSummary.parse = function (text) {
   var line, handler;
   var lines = text.split('\n');
   var status = new StatusSummary();

   while (line = lines.shift()) {
      line = line.match(/(..)\s(.*)/);
      if (line && (handler = StatusSummary.parsers[line[1]])) {
         handler(line[2], status);
      }
   }

   return status;
};
