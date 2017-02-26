<template lang="html">
    <header>
      <div>💪SQL bro</div>
      <button class="pure-button" v-if="connection" @click="disconnect">
        <i class="fa fa-sign-out"></i> Disconnect
      </button>
    </header>
</template>

<script>
import bus from '../bus'

export default {
  computed: {
    connection () {
      return bus.dbConnection;
    }
  },
  methods: {
    disconnect() {
      bus.disconnect();
    }
  }
}
</script>

<style lang="css" scoped>
  header {
      height: 60px;
      border-bottom: 1px solid grey;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
  }
  header > * {
      margin: auto;
  }
</style>
