<template lang="html">
  <div class="error" @mouseover="showMagicalEE" @mouseleave="hideMagicalEE">
      <p><i class="fa fa-times-circle"></i> Error #{{result.error.errno}}</p>
      <p>“{{ result.error.message }}<span v-show="showEE">. Do you even sql bro?!</span>”</p>
  </div>
</template>

<script>
export default {
  props: ['result'],
  data: function(){
    return {
      showEE : false
    }
  },
  methods: {
    showMagicalEE () {
      this.showEE = true
    },
    hideMagicalEE () {
      this.showEE = false
    }
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
