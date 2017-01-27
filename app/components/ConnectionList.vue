<template lang="html">
  <connection-dialog @addConnection="addConnection($event)"></connection-dialog>
  <ul>
    <li v-for="connection in connections">
      <connection :connection="connection"></connection>
    </li>
    <li><button @click="openConnection">Add Connection</button></li>
  </ul>
</template>

<script>
import bus from '../bus'

import Connection from './Connection'
import ConnectionDialog from './ConnectionDialog'

let storage = localStorage

export default {
  components: {
    Connection,
    ConnectionDialog
  },
  data: function () {
    return {
      connections: []
    }
  },
  methods: {
    // addConnection (newConnection) {
    //   moved to events for now.
    // },
    // also, all this storage stuff is probably a sign that it should be in the bus,
    // and the bus should just persist everythign. :-|
    removeConnection (oldConnection) {
      this.connections = this.connections.filter(c => c !== oldConnection)
      storage.setItem('connections', JSON.stringify(this.connections))
    },
    openConnection () {
      bus.$emit('openConnection')
    }
  },
  created () {
    this.connections = JSON.parse(storage.getItem('connections')) || []
  },
  // This is more vue 1. Should be that @addConnection above (which currently does nothing)
  events: {
    'addConnection' ($event) {
      console.log('HAPL!')
      this.connections.push($event)
      storage.setItem('connections', JSON.stringify(this.connections))
    },
    'deleteConnection' ($event) {
      this.removeConnection($event)
    }
  }

}
</script>

<style lang="css">
</style>
