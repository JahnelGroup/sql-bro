<template lang="html">
    <div class="">
        <p>export as csv, json, sql insert</p>
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
  }
}
</script>

<style lang="css">
</style>
