<template lang="html">
    <div class="">
        <input type="text" v-model="filterValue">
        <ul>
            <li v-for="table in filteredList">
                {{ table }}
                <i class="fa fa-eye" aria-hidden="true" @click="viewTable(table)"></i>
            </li>
        </ul>
    </div>

</template>

<script>
import bus from '../bus'
import dbConnection from '../db'

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
  },
  methods: {
    viewTable: (table) => {
      dbConnection.runQuery('select * from ' + table + ';')
      .then(bus.setCurrentResults)
    }
  }
}
</script>

<style lang="css" scoped>
/* Put a magnifying glass on the filter view. */
/* Put table symbles on the tables */
ul {
  list-style: none;
  padding: 0;
}
li {
  padding-left: 1.3em;
}
li:before {
  content: "\f0ce"; /* FontAwesome Unicode */
  font-family: FontAwesome;
  display: inline-block;
  margin-left: -1.3em; /* same as padding-left set on li */
  width: 1.3em; /* same as padding-left set on li */
}

.fa-eye{
  display: none;
}

li:hover .fa-eye{
  display: inline-block;
  cursor: pointer;
}
</style>
