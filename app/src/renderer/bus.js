import Vue from 'vue'
import db from './db'

export default new Vue({
  data: {
    dbConnection: null,
    currentResults: null,
    currentConnection: null,
    currentSchema: null,
    currentObjects: null
  },
  methods: {
    setConnection (con) {
      return db.createConnection(con)
        .then(() => {
          this.currentConnection = {
            connectionName: con.connectionName,
            environment: con.environment,
            user: con.user
          }
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
        .then(this.setCurrentResults)
        .then(() => this.currentSchema = schemaName)
        .catch(() => this.currentSchema = null);
    }
  }
})
