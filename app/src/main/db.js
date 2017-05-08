import mysql from 'mysql'
import { ipcMain } from 'electron'

export { 
    createConnection
}

function createConnection (connectionInfo) {
    console.log(connectionInfo)
  const connection = mysql.createConnection({
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
          console.log(err)
        reject('Error connecting: ' + err.stack)
      } else {
        resolve(connection)
      }
    })
  });
}

ipcMain.on('query', (event, conn, id, query) => {
    createConnection(conn)
        .then(conn => conn.query(query, function (error, results, fields) {
            if (error) {
                const name = error.constructor.name
                const message = error.toString()
                const newError = Object.assign({}, error, {
                    constructor: { name },
                    message
                })
                event.sender.send('query-result' + id, newError)
            } else {
                const type = results.constructor.name
                results.constructor = {name: type}
                if (Array.isArray(results)) {
                    results.forEach(el => {
                        el.constructor = {
                            name: el.constructor.name
                        }
                    })
                }
                if (Array.isArray(fields)) {
                    fields.forEach(el => {
                        el.constructor = {
                            name: el.constructor.name
                        }
                    })
                }
                event.sender.send('query-result' + id, null, results, fields)
            }
      })).catch(err => {
          event.sender.send('query-result' + id, err)
      })
})