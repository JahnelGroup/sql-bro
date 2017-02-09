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
  return new Promise(function (resolve) {
    const startTime = new Date()
    connection.query(query, function (error, results, fields) {
      let returnVal
      if (error) {
        returnVal = {
          type: 'result-error',
          error
        }
      } else {
        returnVal = transformResults(results, fields)
      }
      const runTime = new Date() - startTime
      returnVal.runTime = runTime
      resolve(returnVal);
    })
  })
}

function createConnection (connectionInfo) {
  connection = mysql.createConnection({
    ...connectionInfo,
    multipleStatements: true,
    typeCast: function (field, next) {
      if (field.type == 'DATE') return field.string();
      return next()
    }
  })
  return new Promise(function (resolve, reject) {
    connection.connect(function (err) {
      if (err) {
        connection = null;
        reject('Error connecting: ' + err.stack)
      } else {
        resolve(connection)
      }
    })
  });
}

/**
 * Returns the the results, transformed for display.
 * May be called recursively.
 * @param {Object} result
 * @param {Object} fields - if a table result.
 * @returns {Object} containing the type, and fields for that type.
 */
function transformResults(result, fields) {
  let returnVal;
  if (result.constructor.name === 'OkPacket') {
    returnVal = result
    returnVal.type = 'result-status'
  } 
    // is it a multi-function?
    // This is tricky. results will be [], so will fields[].
    // But, results can have arrays, or OK packets: [[], OkPacket],
    // fields can have arrays or undefined. [[], undefined]
    // Normally, they'll have RowDataPackets or FieldPackets.
    else if (Array.isArray(result) && Array.isArray(fields) &&
        (result.find(res => res.constructor && res.constructor.name === "RowDataPacket") ||
         fields.find(f => f && f.constructor && f.constructor.name == "FieldPacket"))) {
           // not a multifunction; just a grid.
    let type = 'result-table'
    let headers = fields.map(f => f.name)
    let rows = result.map(r => headers.map(name => r[name]))
    returnVal = {
      type,
      db: fields[0].db,
      table: fields[0].table,
      headers,
      rows
    }
  } else {
    returnVal = {
      type: 'result-multiple',
      results: result.map((el, i) => transformResults(el, fields[i]))
    }
  }
  return returnVal;
}