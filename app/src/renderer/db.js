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

export default {
  getSchemas,
  getObjectsForSchema,
  runQuery,
  createConnection
}

function getSchemas () {
  return new Promise(function (resolve, reject) {
    connection.query('SHOW DATABASES', function (error, results) {
      if (error) reject(error)
      resolve(results.map(db => db.Database))
    })
  })
}

// SHOW FULL TABLES (tables/views)
// Should actually query some complicated thing out of information_schema
const tableTypes = {
  'BASE TABLE': 'table',
  'VIEW': 'view',
  'SYSTEM VIEW': 'view',
  'PROCEDURE': 'procedure',
  'FUNCTION': 'function'
}
function getObjectsForSchema (schema) {
  return new Promise(function (resolve, reject) {
    connection.query(
      `select routine_name as name, routine_type as type, 'viewProc' as view
        FROM INFORMATION_SCHEMA.routines
        WHERE routine_schema = '${schema}'
        UNION
        select table_name as name, table_type as type, 'viewTable' as view
        from information_schema.tables
        where table_schema = '${schema}'
        ORDER BY name`,
      function (error, results) {
      if (error) reject(error)
      resolve(results.map(t => ({
        name: t.name,
        type: tableTypes[t.type],
        view: t.view
      })));
    })
  })
}

function runQuery (query) {
  return new Promise(function (resolve, reject) {
    connection.query(query, function (error, results, fields) {
      if (error) reject(error)
      let returnVal
      if (results.constructor.name === 'OkPacket') {
        returnVal = results
        returnVal.type = 'result-status'
      } else {
        let type = 'result-table'
        let headers = fields.map(f => f.name)
        let rows = results.map(r => headers.map(name => r[name]))
        returnVal = {
          type,
          headers,
          rows
        }
      }
      resolve(returnVal)
    })
  })
}

function createConnection (connectionInfo) {
  connection = mysql.createConnection({
    ...connectionInfo,
    multipleStatements: true
  })
}
