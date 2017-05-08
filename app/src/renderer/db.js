import { ipcRenderer } from 'electron'

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

function createConnection (connectionInfo) {
  connection = connectionInfo
  return Promise.resolve()
}

function getSchemas () {
  return sendQuery('SHOW DATABASES')
    .then(({err, results}) => err ?
        Promise.reject(err) :
        results.map(db => db.Database));
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
  return sendQuery(`select routine_name as name, routine_type as type, 'viewProc' as view
          FROM INFORMATION_SCHEMA.routines
          WHERE routine_schema = '${schema}'
          UNION
          select table_name as name, table_type as type, 'viewTable' as view
          from information_schema.tables
          where table_schema = '${schema}'
          ORDER BY name`)
        .then(({err, results}) => err ?
            Promise.reject(err) :
            results.map(t => ({
              name: t.name,
              type: tableTypes[t.type],
              view: t.view
            })))
}

function runQuery (query) {
  return sendQuery(query)
    .then(({error, results, fields, runTime}) => {
      let returnVal
        if (error) {
          returnVal = {
            type: 'result-error',
            error
          }
        } else {
          returnVal = transformResults(results, fields)
        }
        returnVal.runTime = runTime
        return returnVal
    })
}

function sendQuery (query) {
  return new Promise(function (resolve) {
    const startTime = new Date()
    const id = performance.now()

    ipcRenderer.once('query-result'+id, (event, error, results, fields) => {
        const runTime = new Date() - startTime
        ipcRenderer.send('logQuery', {timestamp: new Date(), query, runTime});
        resolve({
          error,
          results,
          fields,
          runTime
        });
    })
    ipcRenderer.send('query', connection, id, query)
  })
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