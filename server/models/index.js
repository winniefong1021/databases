var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.dbConnection.query('SELECT * FROM messages', (err, results) => {
        if (err) {
          console.log(err);
        } else {
          callback(null, results);
        }
      });
    },
    post: function (reqBody, callback) {
      db.dbConnection.query(`SELECT id from users where username = '${reqBody.username}'`, (err, results) => {
        if (err) {
          console.log(err);
        } else if (results.length === 0) {
          db.dbConnection.query(`INSERT into users (username) VALUES('${reqBody.username}')`, (err) => {
            if (err) {
              console.log(err);
            } else {
              db.dbConnection.query(`INSERT INTO messages (text, user_id, roomname) VALUES('${reqBody.message}', (SELECT id from users WHERE username = '${reqBody.username}'), '${reqBody.roomname}')`, (err) => {
                if (err) {
                  console.log('username not found');
                } else {
                  callback(null, 'db: message posted');
                }
              });
            }
          });
        } else {
          db.dbConnection.query(`INSERT INTO messages (text, user_id, roomname) VALUES('${reqBody.message}', (SELECT id from users WHERE username = '${reqBody.username}'), '${reqBody.roomname}')`, (err) => {
            if (err) {
              console.log('username not found');
            } else {
              callback(null, 'db: message posted');
            }
          });
        }
      });
    }
  },

  users: {
    get: function (callback) {
      db.dbConnection.query('SELECT * FROM users', (err, results) => {
        if (err) {
          console.log(err);
        } else {
          callback(null, results);
        }
      });
    },
    post: function (username, callback) {
      db.dbConnection.query(`INSERT into users (username) VALUES('${username}')`, (err) => {
        if (err) {
          console.log(err);
        } else {
          callback(null, 'db: user posted');
        }
      });
    }
  }
};

