const db = require('./dbService');

module.exports = {
  getHistory() {
    return db(`select
      history.id as id,
      history.issueID as issueID,
      history.last_update as last_update,
      users.login as assignedOld,
      users.login as assignedNew,
      users.login as changer,
      issuestatus.status as statusNew,
      issuestatus.status as statusOld
      from history
      left join users on
        (
          ( users.id = history.assignedOldID ) or
          ( users.id = history.assignedNewID ) or
          ( users.id = history.changerID )
        )
      left join issuestatus on
        (
          ( issuestatus.id = history.statusNewID ) or
          ( issuestatus.id = history.statusOldID )
        )
      order by history.id`);
  },
};
