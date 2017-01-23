<template lang="html">
  <aside>
      <h4>Schemas</h4>
      <nav>
          <section v-for="schema in schemas">
              <h5>{{ schema }}</h5>
              <schema :name="schema"></schema>
          </section>
      </nav>
  </aside>
</template>

<script>
import bus from '../bus'
import Schema from './Schema'

export default {
  components: {
    Schema
  },
  data: function () {
    return {
      schemas: []
    }
  },
  created () {
    let vm = this
    bus.dbConnection.getSchemas()
      .then(function (res) {
        vm.schemas = res
      })
  }
}
</script>

<style lang="css" scoped>
aside {
    overflow-y: scroll;
}
</style>
