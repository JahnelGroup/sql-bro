<template lang="html">
  <aside>
      <h4>Databases</h4>
      <nav>
          <section v-for="schema in schemas" class="schema"
              :class="{active: currentSchema==schema }">
            <div class="schemaNameGroup">
              <label class="schemaName">
                  <input type="checkbox" class="hidden"
                        v-model="visible" :value="schema"
                        @click="useSchema(schema, $event)">
              <i class="fa fa-database" aria-hidden="true"></i>
              {{ schema }}
              </label>
            </div>
            <schema v-if="visible.includes(schema)" :name="schema"></schema>
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
      schemas: [],
      visible: []
    }
  },
  created () {
    let vm = this
    bus.dbConnection.getSchemas()
      .then(function (res) {
        vm.schemas = res
      })
  },
  methods: {
    useSchema (schema, event) {
      if (event.target.checked) {
        bus.setCurrentSchema(schema)
      }
    }
  },
  computed: {
    currentSchema() {
      return bus.currentSchema;
    }
  }
}
</script>

<style lang="css" scoped>
h4 {
  text-align: center;
}
.schemaNameGroup{
  margin-bottom: 15px;
}

.schemaName{
  width: auto;
  font-weight: bold;
}

.active {
  background-color: var(--success-background);
  border: 1px solid var(--success);
  border-radius: var(--curve-size);
  margin: -1px;
}
.schema {
  padding: .5em;
}
</style>
