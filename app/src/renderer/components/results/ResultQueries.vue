<template lang="html">
  <div class="success">
      Last 10 queries...
      <ol>
          <li v-for="query in result.queries">
              <button class="pure-button" @click="runQuery(query.query)">
                  <i class="fa fa-bolt" aria-hidden="true"></i> Run</button>
              <span>{{ query.query }}</span>
          </li>
      </ol>
  </div>
</template>

<script>
import dbConnection from '../../db'
import bus from '../../bus'

export default {
  props: ['result'],
  methods: {
      runQuery(query) {
        dbConnection.runQuery(query)
        .then(bus.setCurrentResults)
        .then(() => {
          bus.setLastRunQuery(query)
        })
      }
  }
}
</script>

<style lang="css">
.success {
  margin: 1em;
  padding: 1em;
  border-radius: var(--curve-size);
  color: var(--success);
  /*background-color: var(--success-background);*/
}
</style>
