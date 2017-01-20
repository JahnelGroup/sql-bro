<template lang="html">
  <textarea v-model="query"></textarea>
  <button type="button" @click="executeQuery">Run</button>
</template>

<script>
import { runQuery } from '../db'

export default {
  data: function () {
    return {
      query: ''
    }
  },
  methods: {
    executeQuery () {
      runQuery(this.query)
        .then(function (res) {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="css">
  p{
    color: black;
  }
</style>
