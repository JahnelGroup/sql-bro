import fs from 'fs'
import path from 'path'
import {app} from 'electron'

let logFileName = 'sql-bro-query-log.txt'
let recentQueriesName = 'sql-bro-recent-queries.txt'
let logPath = path.join(app.getPath('userData'), logFileName);
let recentPath = path.join(app.getPath('userData'), recentQueriesName)

export {queryLogger, getRecentQueries} 

function queryLogger(event, query) {
    // log to full query log
    fs.appendFile(logPath, `${query.timestamp} : ${query.query} : ${query.runTime} ms\n`, handleWriteError)
    // log to recent queries
    fs.readFile(recentPath, (err, data) => {
        let recentQueries = data ? JSON.parse(data) : [];
        recentQueries.unshift(query);
        fs.writeFile(recentPath, JSON.stringify(recentQueries.slice(0,10)), {encoding: 'utf8'}, handleWriteError);
    })
}

function getRecentQueries (event) {
    event.returnValue = JSON.parse(fs.readFileSync(recentPath, 'utf8'))
}

function handleWriteError(err, resp) { /* todo */ }