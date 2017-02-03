<template lang="html">
  <div class="error">
      <p><i class="fa fa-times-circle"></i> Error #{{result.error.errno}}</p>
      <p>“{{ result.error.message }}”</p>
  </div>
</template>

<script>
export default {
  props: ['result'],
  created () {
    /*eslint no-console:0*/
    console.log(this.result)
  }
}
</script>

<style lang="css" scoped>
.error {
  margin: 1em;
  padding: 1em;
  border-radius: var(--curve-size);
  color: var(--error);
  background-color: var(--error-background);
}
</style>
