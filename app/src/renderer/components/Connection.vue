<template lang="html">
  <div class="">
    {{ connection.connectionName }}
    <button type="button" @click="connect">
      <span v-if="connecting">
        <i class="fa fa-refresh fa-spin fa-fw" aria-hidden="true"></i>
        <span class="sr-only">Attempting to connect...</span></span>
      <span v-else>Connect</span>
    </button>
    <button type="button" @click="editConnection">Edit</button>
    <button type="button" @click="removeConnection">Remove</button>
  </div>
</template>

<script>
import bus from '../bus'
export default {
  data: function () { 
    return {
      connecting: false,
      error: null
    }
  },
  props: ['connection'],
  methods: {
    connect () {
      this.connecting = true;
      bus.setConnection(this.connection)
      .then(() => this.connecting=false)
      .catch((err) => {
        alert(err);
        this.connecting=false;
      })
    },
    removeConnection () {
      this.$emit('deleteConnection', this.connection)
    },
    editConnection () {
      bus.$emit('editConnection', this.connection)
    }
  }
}
</script>

<style lang="css">
</style>
