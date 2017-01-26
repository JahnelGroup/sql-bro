<template lang="html">
    <div class="">
          <textarea v-model="query"></textarea>
          <button type="button" @click="executeQuery">Run</button>
    </div>

</template>

<script>
import dbConnection from '../db'
import bus from '../bus'
export default {
  data: function () {
    return {
      query: ''
    }
  },
  methods: {
    executeQuery () {
      dbConnection.runQuery(this.query)
        .then(bus.setCurrentResults)
    }
  }
}
</script>

<style lang="css">
  textarea {
      font-family: monospace;
      width: 100%;
  }
</style>
