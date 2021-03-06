import Vue from 'vue'
import db from './db'
import {ipcRenderer} from 'electron'

export default new Vue({
  data: {
    dbConnection: null,
    currentResults: null,
    currentConnection: null,
    currentSchema: null,
    currentObjects: null,
    lastRunQuery: null,
  },
  methods: {
    setConnection (con) {
      return db.createConnection(con)
        .then(() => {
          this.currentConnection = con
          this.dbConnection = db
        })
    },
    disconnect () {
      this.currentConnection = null
      this.dbConnection = null
      this.currentSchema = null
      this.currentResults = null
    },
    setCurrentResults (results) {
      this.currentResults = results
    },
    setCurrentSchema(schemaName) {
      this.dbConnection.runQuery(`use ${schemaName};`)
        .then(() => {
            this.currentSchema = schemaName
            this.currentConnection.database = schemaName
            return db.createConnection(this.currentConnection)
        })
        .catch(() => {
          this.currentSchema = null
          this.currentConnection.database = null
        });
      this.$emit("changedSchema", schemaName)
    },
    setLastRunQuery (query) {
      this.lastRunQuery = query;
    },
    getRecentQueries() {
      let recentQueries = {
        queries: ipcRenderer.sendSync('getRecentQueries'),
        type: 'result-queries'
      }
      this.setCurrentResults(recentQueries)
    }
  }
})
