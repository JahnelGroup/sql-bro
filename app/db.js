import mysql from 'mysql'

/*
target API: what does we need?
given a connection:
• list all schemas,
• list all tables/functions/procs/views within a schema
• issue a Query
•
*/

let connection

export {
  getSchemas,
  getObjectsForSchema,
  runQuery,
  makeConnnection
}

function getSchemas () {
  return new Promise(function (resolve, reject) {
    connection.query('SHOW DATABASES', function (error, results, fields) {
      if (error) reject(error)
      resolve(results.map(db => db.Database))
    })
  })
}

// SHOW FULL TABLES (tables/views)
// Should actually query some complicated thing out of information_schema
function getObjectsForSchema (schema) {
  return new Promise(function (resolve, reject) {
    connection.query(`SHOW FULL TABLES IN ${schema}`, function (error, results, fields) {
      if (error) reject(error)
      resolve(results.map(t => t[`Tables_in_${schema}`]))
    })
  })
}

function runQuery (query) {
  return new Promise(function (resolve, reject) {
    connection.query(query, function (error, results, fields) {
      if (error) reject(error)
      resolve(results)
    })
  })
}

function makeConnnection (connectionInfo) {
  connection = mysql.createConnection(connectionInfo)
}
