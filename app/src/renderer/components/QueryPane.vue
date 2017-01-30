<template lang="html">
    <div class="">
          <textarea v-model="query"></textarea>
          <button type="button" @click="executeQuery">
              <i class="fa fa-bolt" aria-hidden="true"></i> Run</button>
          <button type="button" >
              <i class="fa fa-save" aria-hidden="true"></i> Save</button>
          <select class="" name="">
              Saved Queries
          </select>
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
      width: calc(100% - var(--curve-size));
      overflow: scroll;
      resize: none;
      height: calc(100% - 32px);
      overflow-x: hidden;
  }
</style>
