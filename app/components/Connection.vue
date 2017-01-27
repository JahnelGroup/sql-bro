<template lang="html">
  <div class="">
    {{ connection.connectionName }}
    <button type="button" @click="connect">Connect</button>
    <button type="button" @click="delete">Delete</button>
  </div>
</template>

<script>
import bus from '../bus'
export default {
  props: ['connection'],
  methods: {
    connect () {
      bus.setConnection(this.connection)
    },
    delete () {
      this.$dispatch('deleteConnection', this.connection)
    }
  }
}
</script>

<style lang="css">
</style>
