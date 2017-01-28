<template lang="html">
  <dialog :open="open">
    <form class="" method="dialog">
      <label for="connectionName">Connection name:
        <input type="text" name="connectionName" v-model="connectionName" />
      </label>
      <label for="host">Host:
        <input type="text" name="host" v-model="host" />
      </label>
      <label for="user">User:
        <input type="text" name="user" v-model="user" />
      </label>
      <label for="password">Password:
        <input type="text" name="password" v-model="password" />
      </label>
      <button type="submit" name="connect" @click.prevent="add">Add</button>
      <button type="button" name="cancel" @click.prevent="cancel">Cancel</button>
    </form>
  </dialog>
</template>

<script>
import bus from '../bus'

export default {
  data: function () {
    return {
      open: false,
      connectionName: '',
      host: '',
      user: '',
      password: ''
    }
  },
  methods: {
    add () {
      // We're using vue 1 by accident! :-O This will be $emit when changed.
      this.$emit('addConnection', {
        connectionName: this.connectionName,
        host: this.host,
        user: this.user,
        password: this.password
      })
      this.clear()
    },
    cancel () {
      this.clear()
    },
    clear () {
      this.connectionName = ''
      this.host = ''
      this.user = ''
      this.password = ''
      this.open = false
    }
  },
  created () {
    bus.$on('openConnection', () => {
      this.open = true
    })
  }
}
</script>

<style lang="css">
textarea {
    height: 150px;
}
</style>
