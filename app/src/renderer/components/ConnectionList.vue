<template lang="html">
  <div class="">
    <connection-dialog
        @addConnection="addConnection($event)"
        @saveConnection="saveConnection">
    </connection-dialog>
    <ul>
      <li v-for="connection in connections">
        <connection :connection="connection"
            @deleteConnection="removeConnection($event)"></connection>
      </li>
    </ul>
    <button @click="openConnection" class="pure-button"><i class="fa fa-plus"></i> Add Connection</button>
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
      newConnection.id = Date.now();
      this.connections.push(newConnection)
      storage.setItem('connections', JSON.stringify(this.connections))
    },
    // also, all this storage stuff is probably a sign that it should be in the bus,
    // and the bus should just persist everythign. :-|
    removeConnection (oldConnection) {
      this.connections = this.connections.filter(c => c.id !== oldConnection.id)
      storage.setItem('connections', JSON.stringify(this.connections))
    },
    saveConnection (connection) {
      let id = this.connections.findIndex(c => c === connection || c.id === connection.id);
      this.connections.splice(id, 1, connection);
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

<style lang="css" scoped>
ul {
  list-style-type: none;
}
li {
  display: inline-block;
  width: 250px;
  border: 1px solid black;
  margin: 5px;
  border-radius: var(--curve-size);
}
</style>
