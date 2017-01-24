<template lang="html">
  <table>
    <thead>
      <tr>
        <td v-for="header in result.headers">{{ header }}</td>
      <tr>
    </thead>
    <tbody>
      <tr v-for="row in result.rows">
        <td v-for="cell in row">{{ cell }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['result']
}
</script>

<style lang="css">
</style>
