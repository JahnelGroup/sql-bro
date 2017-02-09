<template lang="html">
    <div class="results">
        <component v-if="results" :is="results.type" :result="results"></component>
        <span v-if="results">{{ results.runTime / 1000 }} Seconds</span>
        <p>Next/Prev buttons (if limit)</p>
    </div>
</template>

<script>
import bus from '../bus'
import ResultStatus from './results/ResultStatus'
import ResultTable from './results/ResultTable'
import ResultError from './results/ResultError'
import ResultMultiple from './results/ResultMultiple'

export default {
  components: {
    ResultStatus,
    ResultTable,
    ResultError,
    ResultMultiple
  },
  computed: {
    results () {
      return bus.currentResults
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
