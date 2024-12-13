
const { defineConfig } = require('cypress');
const mysql = require('mysql');

const sharedState = {};

module.exports = defineConfig({
  projectId: "92tcyw",
  reporter: 'cypress-mochawesome-reporter',
  video: true,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'GreenMailer Reports',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: false,
  },
  e2e: {
    viewportWidth: 1680,
    viewportHeight: 1050,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      screenshotOnRunFailure = true;

      // Database connection configuration
      const dbConfig = {
        host: 'zds-db2-vip.bo3.e-dialog.com',
        user: 'rltpuser',
        password: 'rltp12#$',
        database: 'RLTP_STAGING_DB'
      };

      // Create a task for database queries
      on('task', {
        queryDb: (query) => {
          const connection = mysql.createConnection(dbConfig);
          return new Promise((resolve, reject) => {
            connection.connect((err) => {
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
        },
        saveData: (data) => {
          sharedState.data = data;
          return null;
        },
        getData: () => {
          return sharedState.data || null;
        },
      });

      return config;
    },
    baseUrl: 'http://10.100.6.107/greenmailer/#/login?path=',
    CYPRESS_RECORD_KEY: '1ee4cbad-b733-4827-a3aa-28a74cfa48ba',
    // specPattern: 'cypress/e2e/*.js',
    defaultCommandTimeout: 15000
  },
  env: {
    currentuser: {
      username: 'Ajay_QA',
      Password: 'Ajay@1234'
    }
  },
});


























// const { defineConfig } = require('cypress');




// const sharedState = {};


// module.exports = defineConfig({
//   projectId: "92tcyw",
//   reporter: 'cypress-mochawesome-reporter',
//   video: true,
//   reporterOptions: {
//     charts: true,
//     reportPageTitle: 'GreenMailer Reports',
//     embeddedScreenshots: true,
//     inlineAssets: true,
//     saveAllAttempts: false,
//   },
//   e2e: {
//     viewportWidth: /*1680,*/ 1680,
//     viewportHeight: /*1050,*/ 1050,
//     setupNodeEvents(on, config) {
//       require('cypress-mochawesome-reporter/plugin')(on);
//       screenshotOnRunFailure = true;

//       on('task', {
//         saveData: (data) => {
//           sharedState.data = data;
//           return null;
//         },
//         getData: () => {
//           return sharedState.data || null;
//         },
//       });
//     },
//     baseUrl: 'http://10.100.6.107/greenmailer/#/login?path=',
//     CYPRESS_RECORD_KEY: '1ee4cbad-b733-4827-a3aa-28a74cfa48ba',
//     specPattern: 'cypress/e2e/*.js',
//     defaultCommandTimeout: 10000

//   },
//   env: {
//     currentuser: {
//       username: 'Ajay_QA',
//       Password: 'Ajay@1234'
//     }
//   },

// });









/*const { defineConfig } = require('cypress');
const mysql = require('mysql');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Database connection configuration
      const dbConfig = {
        host: 'zds-db2-vip.bo3.e-dialog.com',
        user: 'rltpuser',
        password: 'rltp12#$',
        database: 'RLTP_STAGING_DB'
      };

     

      // Create a task for database queries
      on('task', {
        queryDb: (query) => {
          const connection = mysql.createConnection(dbConfig);
          return new Promise((resolve, reject) => {
            connection.connect((err) => {
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
      });

      return config;
    }
  }
});
*/
