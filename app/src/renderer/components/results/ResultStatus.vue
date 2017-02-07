<template lang="html">
  <div class="success">
      <p><i class="fa fa-check"></i>
        <span v-if="result.message">“{{ result.message }}”</span></p>
      <p v-if="result.affectedRows">Rows affected: {{ result.affectedRows }}</p>
      <p v-if="result.changedRows">Rows changed: {{ result.changedRows }}</p>
      <p v-if="result.insertId">Insert ID: {{ result.insertId }}</p>
  </div>
</template>

<script>
export default {
  props: ['result']
}
</script>

<style lang="css">
.success {
  margin: 1em;
  padding: 1em;
  border-radius: var(--curve-size);
  color: var(--success);
  background-color: var(--success-background);
}
</style>
