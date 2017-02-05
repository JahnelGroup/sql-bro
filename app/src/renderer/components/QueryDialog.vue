<template lang="html">
  <dialog :open="openDialog">
    <form class="" method="dialog">
      <label for="queryName">Query name:
        <input type="text" name="queryName" v-model="queryName" />
      </label>
      <button type="submit" name="connect" @click.prevent="add">Add</button>
      <button type="button" name="cancel" @click.prevent="cancel">Cancel</button>
    </form>
  </dialog>
</template>

<script>
import bus from '../bus'
// let storage = localstorage

export default {
  props:['query'],
  data: function () {
    return {
      openDialog: false,
      queryName: ''
    }
  },
  methods: {
    add () {
      this.$emit('addQuery', {
        queryName: this.queryName,
        query: this.query,
      })
      this.clear()
    },
    cancel () {
      this.clear()
    },
    clear () {
      this.queryName = ''
      this.host = ''
      this.user = ''
      this.password = ''
      this.openDialog = false
    }
  },
  created () {
    bus.$on('openQuery', () => {
      this.openDialog = true
    })
  }
}
</script>

<style lang="css">
textarea {
    height: 150px;
}
</style>
