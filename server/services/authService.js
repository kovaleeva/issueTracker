const db = require('./dbService');

function getUsers() {
  return db(`select users.id as id,
    users.login as login,
    users.username as username,
    users.password as password,
    users.email as email,
    usergroup.group as groupUser from users
    left join usergroup on ( usergroup.id=users.groupID )`);
}

module.exports = {
  getUsers,
  checkExistEmail(user) {
    return db(`select * from users where email = '${user.email}'`);
  },
  signUpUser(user) {
    return db(`INSERT INTO users (email, password, login, username, groupID) values ('${user.email}', '${user.password}', '${user.login}', '${user.username}', ${user.group})`);
  },
  deleteUser(userId) {
    return db(`delete from issues where id=${userId}`);
  },
  getUserGroups() {
    return db('select * from userGroup');
  },
};
