const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ragemp'
});

function queryDatabase(query, params, callback) {
  connection.query(query, params, function(err, results) {
    if (err) {
      console.error('Błąd zapytania do bazy danych:', err);
      callback(err, null);
      return;
    }

    callback(null, results);
  });
}

module.exports = {
  queryDatabase
};
