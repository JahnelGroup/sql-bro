<template lang="html">
  <table class="pure-table pure-table-bordered pure-table-striped">
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
    table {
      table-layout: fixed;
    }
</style>
