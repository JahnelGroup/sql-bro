import Vue from 'vue'
import db from './db'

export default new Vue({
  data: {
    dbConnection: null
  },
  methods: {
    setConnection (con) {
      db.createConnection(con)
      this.dbConnection = db
    }
  }
})
