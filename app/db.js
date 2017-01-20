import mysql from 'mysql'
import bus from './bus.js'

/*
target API: what does we need?
given a connection:
• list all schemas,
• list all tables/functions/procs/views within a schema
• issue a Query
•
*/

export {
  getSchemas,
  getObjectsForSchema,
  runQuery,
  createConnection
}

function getSchemas () {
  return new Promise(function (resolve, reject) {
    bus.connection.query('SHOW DATABASES', function (error, results, fields) {
      if (error) reject(error)
      resolve(results.map(db => db.Database))
    })
  })
}

// SHOW FULL TABLES (tables/views)
// Should actually query some complicated thing out of information_schema
function getObjectsForSchema (schema) {
  return new Promise(function (resolve, reject) {
    bus.connection.query(`SHOW FULL TABLES IN ${schema}`, function (error, results, fields) {
      if (error) reject(error)
      resolve(results.map(t => t[`Tables_in_${schema}`]))
    })
  })
}

function runQuery (query) {
  return new Promise(function (resolve, reject) {
    bus.connection.query(query, function (error, results, fields) {
      if (error) reject(error)
      resolve(results)
    })
  })
}

function createConnection (connectionInfo) {
  return mysql.createConnection(connectionInfo)
}
