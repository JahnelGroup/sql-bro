<template lang="html">
    <div @mousemove.self="conditionalResize($event)">
        <p>Ctrl-Enter to run selection or full editor; Ctrl-space to autocomplete.</p>
        <div class="editor">
            <div id="editor"></div>
        </div>
        <div class="button-group">
        <button type="button" class="pure-button" @click="runQuery">
          <span v-if="running">
            <i class="fa fa-refresh fa-spin fa-fw" aria-hidden="true"></i>
            <span class="sr-only">Running Query...</span></span>
          <span v-else><i class="fa fa-bolt" aria-hidden="true"></i> Run</span>
        </button>
        <button type="button" class="pure-button" @click="openQuery">
            <i class="fa fa-save" aria-hidden="true"></i> Save
        </button>
        <query-dialog @addQuery="addQuery($event)"></query-dialog>
        <button @click="openQueriesDropdown()" id="menuLink1" class="pure-button">Saved Queries</button>
        <button @click="showRecentQueries()" class="pure-button">Recent Queries</button>

        <div v-show="clicked" class="savedQueriesList">
          <ul class="queriesDropdown">
            <li v-for="q in filteredQueries" class="queryListElement">
              <div>
                {{q.name}}
                <i class="fa fa-bolt runSavedQueryIcon" aria-hidden="true" @click="runSavedQuery(q.query)"></i>
                <i class="fa fa-trash deleteSavedQueryIcon" aria-hidden="true" @click="deleteSavedQuery(q.name)"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import dbConnection from '../db'
import bus from '../bus'

import completer from '../QueryCompleter'

import QueryDialog from './QueryDialog'

let storage = localStorage


require('brace/mode/sql')
require('brace/ext/language_tools.js') // autocomplete
require('brace/ext/searchbox')
import ace from 'brace'
const langtools = ace.acequire('ace/ext/language_tools')
langtools.addCompleter(completer)

ace.acequire('ace/ext/searchbox')

export default {
  components: {
    QueryDialog
  },
  data: function () {
    return {
      editor: null,
      queries : [],
      filteredQueries : [],
      clicked : false,
      running: false,
      height: 0
    }
  },
  methods: {
    getQuery () {
      return this.editor.session.getTextRange(this.editor.getSelectionRange()) ||
          this.editor.getValue()
    },
    addQuery (newQueryName) {
      let newQuery = {
          name: newQueryName,
          query: this.getQuery(),
          schema: bus.currentSchema
      }
      this.queries.push(newQuery)
      storage.setItem('queries', JSON.stringify(this.queries))
      this.filterSavedQueriesBySchema(bus.currentSchema)
    },
    runQuery () {
      const query = this.getQuery()
      this.executeQuery(query)
    },
    executeQuery (query) {
      this.running = true;
      dbConnection.runQuery(query)
        .then(bus.setCurrentResults)
        .then(() => {
          this.running = false
          bus.setLastRunQuery(query)
        })
    },
    conditionalResize (e) {
      if (e.target.clientHeight != this.height) {
        this.height = e.target.clientHeight
        console.log('resizing!')
        this.editor.resize()
      }
    },
    changedSchema (schemaName) {
      this.filterSavedQueriesBySchema(schemaName)
      bus.setLastRunQuery(null)
    },
    filterSavedQueriesBySchema (schema) {
      this.filteredQueries = this.queries.filter(q => q.schema == schema)
    },
    openQuery () {
      bus.$emit('openQuery')
    },
    openQueriesDropdown () {
      this.clicked = !this.clicked;
    },
    runSavedQuery (query) {
      this.executeQuery(query)
    },
    deleteSavedQuery (name) {
      this.queries = this.queries.filter(q => q.name !== name)
      storage.setItem('queries', JSON.stringify(this.queries))
      this.filterSavedQueriesBySchema(bus.currentSchema)
    },
    showRecentQueries () {
      bus.getRecentQueries();
    }
  },
  mounted () {
    this.height = document.getElementById('query-pane').clientHeight
    this.editor = ace.edit("editor")
    // this.editor.setAutoScrollEditorIntoView(true)
    // this.editor.completers = [completer]
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: false, // need sql/text for this?
      enableLiveAutocompletion: false
    })
    this.editor.getSession().setUseWrapMode(true)
    this.editor.getSession().setMode('ace/mode/sql')
    this.editor.commands.addCommand({
      name: 'runQuery',
      bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
      exec: this.runQuery
    })
  },
  beforeDestroy () {
    this.editor.destroy()
    this.editor.container.remove()
  },
  created () {
    bus.$on('changedSchema', (schemaName) =>{
      this.changedSchema(schemaName)
    });
    this.queries = JSON.parse(storage.getItem('queries')) || []
  }
}
</script>

<style lang="css">
  p {
    margin: 0;
    font-style: italic;
  }
  .query-pane {
      display: flex;
      flex-direction: column;
  }
  .editor {
    width: calc(100% - var(--curve-size));
    height: calc(100% - 4em);
    resize: none;
    position: static;
    /*flex: 1;
    display: flex;*/
  }
  #editor {
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .pure-menu-horizontal{
    z-index: 5;
  }

  .queriesDropdown{
    margin: 0;
  }

  .savedQueriesList{
    display: block;
    top: 33%;
    left: 9.5%;
    position: relative;
  }

  .runSavedQueryIcon{
    margin-left: 10px;
  }

  .deleteSavedQueryIcon{
    margin-left: 10px;
    color: red;
    margin-right: 5px;
  }

  .runSavedQueryIcon:hover, .deleteSavedQueryIcon:hover{
    cursor: pointer;
  }

  .button-group {
    flex-direction: row-reverse;
    display: flex;
    align-content: space-between;
    flex: 1;
  }

  .button-group button, .button-group select {
    margin: 5px;
    flex-basis: auto;
  }

  .queryListElement{
    list-style-type: none;
    padding: 0;
    padding: 10px;
    margin: 0;
    background-color: #E6E6E6;
    border-bottom: 1px grey solid;
  }
</style>
