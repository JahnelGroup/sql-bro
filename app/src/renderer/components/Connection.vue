<template lang="html">
  <div :class="connection.environment">
    <h2>{{ connection.connectionName }}</h2>
    <p><i class = "fa" :class="classMap[connection.environment]"></i>
        {{ connection.user }}@{{ connection.host }}
    </p>
    <button type="button" @click="connect" class="pure-button">
      <span v-if="connecting">
        <i class="fa fa-refresh fa-spin fa-fw" aria-hidden="true"></i>
        <span class="sr-only">Attempting to connect...</span></span>
      <span v-else><i class="fa fa-sign-in"></i> Connect</span>
    </button>
    <button type="button"  @click="editConnection" class="pure-button">
      <i class="fa fa-edit" aria-hidden="true"></i> Edit</button>
    <button type="button" @click="removeConnection" class="pure-button button-warning">
      <i class="fa fa-trash-o" aria-hidden="true"></i> Remove</button>
  </div>
</template>

<script>
import bus from '../bus'
 

export default {
  data: function () { 
    return {
      connecting: false,
      error: null,
      classMap: {
        Production: 'fa-warning',
        Testing: 'fa-info-circle',
        Local: 'fa-check-circle'
      }
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

<style lang="css" scoped>
  div {
    text-align: center;
    padding: 5px;
    border-radius: var(--curve-size);
  }
  p {
    margin-bottom: 10px;
  }
</style>
