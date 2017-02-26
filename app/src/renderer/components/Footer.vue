<template lang="html">
  <footer :class="connection && connection.environment">
    <span class="connection">
      <span v-if="connection">
        <i class = "fa" :class="envClass"></i>
        {{ connection.user }}@{{ connection.connectionName }}
      </span>
      <span v-if="schema">
        &#12297; <i class="fa fa-database"></i>
        {{ schema }}
      </span>
    </span>
    <flyway></flyway>
  </footer>
</template>

<script>
  import bus from '../bus'
  import Flyway from './plugins/Flyway'

const classMap = {
  Production: 'fa-warning',
  Testing: 'fa-info-circle',
  Local: 'fa-check-circle'
}
export default {
  components: {
    Flyway
  },
  computed: {
    connection() {
      return bus.currentConnection;
    },
    schema() {
      return bus.currentSchema;
    },
    envClass () {
      return bus.currentConnection &&
        classMap[bus.currentConnection.environment]
    }
  }
}
</script>

<style lang="css" scoped>
footer {
    height: calc(1em + 4px);
    border-top: 1px solid grey;
    bottom: 0;
    padding: 2px;
    display: flex;
    align-content: space-between;
    align-items: baseline;
}
.connection {
  flex: 1;
}
flyway {
  flex: 1;
}

/*
fa-info-circle = info
fa-check = success
fa-warning = warning
fa-times-circle = error
*/

</style>
