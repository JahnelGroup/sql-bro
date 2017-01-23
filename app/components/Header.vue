<template lang="html">
    <header>
      <div>💪SQL bro</div>
      <button @click="openConnection">Connect</button>
    </header>
</template>

<script>
import bus from '../bus'

export default {
  methods: {
    openConnection () {
      bus.$emit('openConnection')
    }
  }
}
</script>

<style lang="css" scoped>
header {
    height: 60px;
    border-bottom: 1px solid grey;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
header > * {
    margin: auto;
}
</style>
