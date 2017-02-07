<template lang="html">
    <div class="">
        <div class="search">
          <input type="text" v-model="filterValue">
          <i class="fa fa-search search"></i>
        </div>
        <ul>
            <li v-for="object in filteredList">
                <i class="fa fa-fw fa-eye" aria-hidden="true" @click="view(object)"></i>
                <i class="fa fa-fw" :class="classes[object.type]" aria-hidden="true"></i>
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
}

li .fa-eye{
  display: none;
}

li:hover .fa-eye{
  display: inline-block;
  cursor: pointer;
}
li:hover .fa-eye + .fa {
  display: none;
}
.search {
  position: relative;
}
input {
  width: 100%;
}
input:focus {
  outline: none;
  /*box-shadow: -1px 1px 5px 1px rgba(0,0,0,0.75);*/
}
.search .fa {
  position: absolute;
  z-index: 1;
  top: 3px;
  right: 3px;
  color: var(--success);
}

</style>
