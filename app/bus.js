import Vue from 'vue'
import { createConnection } from './db'

export default new Vue({
  data: {
    connection: null
  },
  methods: {
    setConnection (con) {
      this.connection = createConnection(con)
    }
  }
})
