<template lang="html">
  <div>
      <p>Rows affected: {{ result.affectedRows }}</p>
      <p>Rows changed: {{ result.changedRows }}</p>
      <p>Insert ID: {{ result.insertId }}</p>
      <p>“{{ result.message }}”</p>
  </div>
</template>

<script>
export default {
  props: ['result']
}
</script>

<style lang="css">
</style>
