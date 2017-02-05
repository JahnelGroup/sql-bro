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
      this.currentConnection = {
        connectionName: con.connectionName,
        user: con.user
      }
      db.createConnection(con)
      this.dbConnection = db
    },
    disconnect () {
      this.currentConnection = null;
      this.dbConnection = null;
      this.currentSchema = null;
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
