<template lang="html">
    <div class="results">
        <div>
          export as csv, json, sql insert
          <button class="clearResultsBtn" @click="clearResults()">Clear Results</button>
        </div>
        <component v-if="results" :is="results.type" :result="results"></component>
        <p>Next/Prev buttons (if limit)</p>
    </div>
</template>

<script>
import bus from '../bus'
import ResultStatus from './results/ResultStatus'
import ResultTable from './results/ResultTable'
import ResultError from './results/ResultError'

export default {
  components: {
    ResultStatus,
    ResultTable,
    ResultError
  },
  computed: {
    results () {
      return bus.currentResults
    }
  },
  methods: {
    clearResults: () => {
      bus.setCurrentResults('')
    }
  }
}
</script>

<style lang="css">
  .clearResultsBtn{
    float: right;
  }
  .results {
      overflow: auto;
  }
</style>
