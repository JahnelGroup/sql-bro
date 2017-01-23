<template lang="html">
    <div class="">
        <input type="text" v-model="filterValue">
        <ul>
            <li v-for="table in filteredList">{{ table }}</li>
        </ul>
    </div>

</template>

<script>
import bus from '../bus'

export default {
  props: ['name'],
  data () {
    return {
      objects: [],
      filterValue: ''
    }
  },
  computed: {
    filteredList () {
      return this.objects
        .filter(o => (new RegExp(this.filterValue, 'i')).test(o))
    }
  },
  created () {
    let vm = this
        // populate the list of objects for this schema.
    bus.dbConnection.getObjectsForSchema(this.name)
      .then(function (res) {
        vm.objects = res
      })
  }
}
</script>

<style lang="css">
/* Put a magnifying glass on the filter view. */
/* Put table symbles on the tables */
</style>
