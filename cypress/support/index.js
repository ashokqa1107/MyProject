const mysql = require('mysql');
const dbConfig = {
  host: '10.100.6.181',
  user: 'pmtauser',
  password: 'pmta12#$',
  database: 'CAMPAIGN_TOOL_QA'
};



function queryTestDb(query) {
  const connection = mysql.createConnection(dbConfig);
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        reject(err);
      }
      connection.query(query, (error, results) => {
        connection.end();
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  });
}

Cypress.Commands.add('queryDb', (query) => {
  return queryTestDb(query);
});
