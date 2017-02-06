<template>
    <ol>
        <li v-for="res in result.results">
            <component :is="res.type" :result="res"></component>
        </li>
    </ol>
</template>
<script>
import ResultStatus from './ResultStatus'
import ResultTable from './ResultTable'
import ResultError from './ResultError'

export default {
  props: ['result'],
  components: {
    ResultStatus,
    ResultTable,
    ResultError,
  }
}
</script>