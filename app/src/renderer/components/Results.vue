<template lang="html">
    <div class="results">
        <div>
          export as csv, json, sql insert
          <button class="clearResultsBtn" @click="clearResults()">Clear Results</button>
        </div>
        <component :is="results.type" :result="results"></component>
        <p>Next/Prev buttons (if limit)</p>
    </div>
</template>

<script>
import bus from '../bus'
import ResultStatus from './ResultStatus'
import ResultTable from './ResultTable'

export default {
  components: {
    ResultStatus,
    ResultTable
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
