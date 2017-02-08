<template lang="html">
  <dialog> <!-- :open="open"-->
    <form class="pure-form pure-form-stacked" method="dialog">
      <label for="connectionName">Connection name:
        <input type="text" name="connectionName" v-model="connection.connectionName" />
      </label>
      <label for="environment">Environment:
        <select id="environment" v-model="connection.environment">
            <option>Local</option>
            <option>Testing</option>
            <option>Production</option>
        </select>
      </label>
      <label for="host">Host:
        <input type="text" name="host" v-model="connection.host" />
      </label>
      <label for="user">User:
        <input type="text" name="user" v-model="connection.user" />
      </label>
      <label for="password">Password:
        <input type="text" name="password" v-model="connection.password" />
      </label>
      <button v-if="mode == 'add'" type="submit" name="connect"
          class="pure-button pure-button-primary"         @click.prevent="add">Add</button>
      <button v-else type="submit" name="connect"
          class="pure-button pure-button-primary"
          @click.prevent="save">Save</button>
      <button type="button" name="cancel" 
          class="pure-button"
          @click.prevent="cancel">Cancel</button>
    </form>
  </dialog>
</template>

<script>
import bus from '../bus'

export default {
  data: function () {
    return {
      mode: 'add',
      connection: {}
    }
  },
  methods: {
    add () {
      this.$emit('addConnection', this.connection)
      this.clear()
    },
    save () {
      this.$emit('saveConnection', this.connection)
      this.clear()
    },
    cancel () {
      this.clear()
    },
    clear () {
      this.connection = {};
      document.querySelector('dialog').close()
      // this.open = false
    }
  },
  created () {
    bus.$on('openConnection', () => {
      this.mode = 'add'
      // this.open = true
      document.querySelector('dialog').showModal()
    })
    bus.$on('editConnection', (connection) => {
      this.mode = 'edit'
      this.connection = Object.assign({}, connection)
      // this.open = true;
      document.querySelector('dialog').showModal()
    })
  }
}
</script>

<style lang="css" scoped>
textarea {
    height: 150px;
}
dialog {
  background: #FFF;
  width: 300px;
  padding: 1.5em;
  margin: 1em auto;
  border: 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.8);
}

</style>
