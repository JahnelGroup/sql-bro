<template lang="html">
  <dialog :open="open">
    <form class="" method="dialog">
      <label for="host">Host:
        <input type="text" name="host" v-model="host" />
      </label>
      <label for="user">User:
        <input type="text" name="user" v-model="user" />
      </label>
      <label for="password">Password:
        <input type="text" name="password" v-model="password" />
      </label>
      <button type="submit" name="connect" @click.prevent="connect">Connect</button>
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
      host: '',
      user: '',
      password: ''
    }
  },
  methods: {
    connect () {
      console.log('test')
      bus.setConnection({
        host: this.host,
        user: this.user,
        password: this.password
      })
      this.clear()
    },
    cancel () {
      console.log('cancel')
      this.clear()
    },
    clear () {
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
