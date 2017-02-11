<template lang="html">
  <dialog :open="open">
    <form class="pure-form pure-form-stacked" method="dialog">
      <label for="queryName">Query name:
        <input type="text" name="queryName" v-model="queryName" />
      </label>
      <button type="submit" name="connect" class="pure-button pure-button-primary" @click.prevent="add">Save</button>
      <button type="button" name="cancel" class="pure-button "@click.prevent="cancel">Cancel</button>
    </form>
  </dialog>
</template>

<script>
import bus from '../bus'

export default {
  data: function () {
    return {
      open: false,
      queryName: ''
    }
  },
  methods: {
    add () {
      this.$emit('addQuery', this.queryName)
      this.clear()
    },
    cancel () {
      this.clear()
    },
    clear () {
      this.queryName = ''
      this.open = false
    }
  },
  created () {
    bus.$on('openQuery', () => {
      this.open = true
    })
  }
}
</script>

<style lang="css" scoped>
  textarea {
      height: 150px;
  }
  dialog {
    background: #FFF;
    width: 200px;
    padding: 1.5em;
    margin: 1em auto;
    border: 0;
    box-shadow: 0 2px 10px rgba(0,0,0,0.8);
  }
</style>
