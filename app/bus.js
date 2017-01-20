import Vue from 'vue'
import { createConnection } from './db'

const bus = new Vue({
  data: {
    connection: null
  },
  methods: {
    setConnection (con) {
      this.connection = createConnection(con)
    }
  }
})
console.log(bus)
export default bus
