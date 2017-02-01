<template lang="html">
    <div class="">
        <input type="text" v-model="filterValue">
        <ul>
            <li v-for="object in filteredList">
                <i class="fa fa-eye" aria-hidden="true" @click="view(object)"></i>
                <i class="fa" :class="classes[object.type]" aria-hidden="true"></i>
                {{ object.name }}
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
      filterValue: '',
      classes: {
        table: 'fa-table',
        view: 'fa-window-restore',
        procedure: 'fa-file-code-o',
        function: 'fa-code',
      }
    }
  },
  computed: {
    filteredList () {
      return this.objects
        .filter(o => (new RegExp(this.filterValue, 'i')).test(o.name))
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
    view  (object) {
      this[object.view](object.name)
    },
    viewTable (table) {
      dbConnection.runQuery(`SELECT * FROM ${this.name}.${table} LIMIT 100;`)
      .then(bus.setCurrentResults)
    },
    viewProc (proc) {
      dbConnection.runQuery(`SELECT ROUTINE_DEFINITION as Definition FROM information_schema.routines WHERE ROUTINE_NAME = '${proc}';`)
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
  display: block;
  white-space: nowrap;
}
li .fa {
  display: inline-block;
  width: 1.3em;
}
/*li {
  padding-left: 1.3em;
}
li:before {
  content: "\f0ce"; /* FontAwesome Unicode
  font-family: FontAwesome;
  display: inline-block;
  margin-left: -1.3em; /* same as padding-left set on li
  width: 1.3em; /* same as padding-left set on li
}*/

li .fa-eye{
  display: none;
}

li:hover .fa-eye{
  display: inline-block;
    width: 1.3em;
  cursor: pointer;
}
li:hover .fa-eye + .fa {
  display: none;
}

</style>
