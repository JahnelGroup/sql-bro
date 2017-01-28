<template lang="html">
  <div class="">
    <connection-dialog
        @addConnection="addConnection($event)"
        @deleteConnection="removeConnection($event)">
    </connection-dialog>
    <ul>
      <li v-for="connection in connections">
        <connection :connection="connection"></connection>
      </li>
      <li><button @click="openConnection">Add Connection</button></li>
    </ul>
  </div>
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
    addConnection (newConnection) {
      this.connections.push(newConnection)
      storage.setItem('connections', JSON.stringify(this.connections))
    },
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
  }
}
</script>

<style lang="css">
</style>
