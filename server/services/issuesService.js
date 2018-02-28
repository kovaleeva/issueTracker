const db = require('./dbService');

module.exports = {
  getIssues() {
    return db(`select issues.id as id, issues.title as title,
      issues.description as description, issueType.type as type,
      issueStatus.status as status, users.login as assignedBy,
      issues.last_update as last_update from  issues
      left join issueType  on ( issueType.id=issues.typeID )
      left join issueStatus on ( issueStatus.id=issues.statusID )
      left join users on ( users.id=issues.assignedBy )
      order by issues.id`);
  },
  insertIssue(issue) {
    return db(`INSERT INTO issues (title, description, typeID) values ('${issue.title}', '${issue.description}', ${issue.typeID})`);
  },
  updateIssue(issue) {
    return db(`update issues set title='${issue.title}', statusID=${issue.status}, description='${issue.description}' where id=${issue.id}`);
  },
  deleteIssue(issueId) {
    return db(`delete from issues where id=${issueId}`);
  },

  getTypes() {
    return db('select * from issueType');
  },
  getStatus() {
    return db('select * from issueStatus');
  },
};
