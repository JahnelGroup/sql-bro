<template lang="html">
  <aside>
      <h4>Schemas</h4>
      <nav>
          <section v-for="schema in schemas">
            <div class="schemaNameGroup">
              <label class="schemaName">
                  <input type="checkbox" class="hidden"
                        v-model="visible" :value="schema">
              <i class="fa fa-database" aria-hidden="true"></i>
              {{ schema }}
              </label>
              <button class="useSchemaBtn"@click="useSchema(schema)">USE schema</button>
            </div>
            <schema v-if="visible.includes(schema)" :name="schema"></schema>
          </section>
      </nav>
  </aside>
</template>

<script>
import bus from '../bus'
import dbConnection from '../db'
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
    useSchema: (schema) => {
      dbConnection.runQuery('use ' + schema + ';')
        .then(bus.setCurrentResults)
    }
  }
}
</script>

<style lang="css" scoped>
.schemaNameGroup{
  margin-bottom: 15px;
}

.schemaName{
  width: auto;
  font-weight: bold;
}

.useSchemaBtn{
  float: right;
}
</style>
