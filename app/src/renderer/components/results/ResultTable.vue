<template lang="html">
  <div class="table-container">
    <button class="pure-button" @click="copyAsSQLinsert">Copy as SQL</button>
    <button class="pure-button" @click="copyAsJSON">Copy as JSON</button>
    <button class="pure-button" @click="copyAsCSV">Copy as CSV</button>
    <button class="pure-button" @click="runLastQuery">
      <i class="fa fa-refresh" aria-hidden="true"></i>
    </button>
    <table class="pure-table pure-table-bordered pure-table-striped">
      <thead>
        <tr>
          <td v-for="header in result.headers">{{ header }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in result.rows">
          <td v-for="cell in row">
            <span v-if="cell">
              {{ cell }}
            </span>
            <span v-else class="null">
              NULL
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { clipboard } from 'electron'
import { asCSV, asJSON, asSQL } from './exportConverter'
import dbConnection from '../../db'
import bus from '../../bus'

export default {
  props: ['result'],
  methods: {
    copy (string) {
      clipboard.writeText(string);
    },
    copyAsSQLinsert() {
      this.copy(asSQL(this.result));
    },
    copyAsJSON() {
      this.copy(asJSON(this.result));
    },
    copyAsCSV() {
      this.copy(asCSV(this.result));
    },
    runLastQuery() {
      if(bus.lastRunQuery !== null){
        let query = bus.lastRunQuery
        dbConnection.runQuery(query)
        .then(bus.setCurrentResults)
        .then(() => bus.setLastRunQuery(query))
      }
    }
  }
}
</script>

<style lang="css" scoped>
    table {
      table-layout: fixed;
    }
    thead {
        font-weight: bold;
    }
    .null {
      color: var(--info);
      font-style: italic;
    }
    .pure-button {
      margin: 5px;
    }
</style>
