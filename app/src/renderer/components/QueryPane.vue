<template lang="html">
    <div class="queryContent">
        <p>Ctrl-Enter to run selection or full editor; Ctrl-space to autocomplete.</p>
        <div class="editor">
            <div id="editor"></div>
        </div>
        <div class="button-group">
        <button type="button" class="pure-button"@click="executeQuery">
            <i class="fa fa-bolt" aria-hidden="true"></i> Run
        </button>
        <button type="button" class="pure-button" @click="openQuery">
            <i class="fa fa-save" aria-hidden="true"></i> Save
        </button>
        <query-dialog @addQuery="addQuery($event)" :query="getQuery()"></query-dialog>
        <select class="" name="savedQueries">
            Saved Queries
        </select>
        </div>
    </div>
</template>

<script>
/*eslint no-console: 0*/
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
      queries : []
    }
  },
  methods: {
    getQuery () {
      return this.editor.session.getTextRange(this.editor.getSelectionRange()) ||
          this.editor.getValue()
    },
    addQuery (newQuery) {
      this.queries.push(newQuery)
      storage.setItem('queries', JSON.stringify(this.queries))
    },
    executeQuery () {
      const query = this.getQuery()
      dbConnection.runQuery(query)
        .then(bus.setCurrentResults)
    },
    openQuery () {
      bus.$emit('openQuery')
    }
  },
  mounted () {
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
      exec: this.executeQuery
    })

    // set up resize-watcher.
    const target = document.getElementById('query-pane')
    this.observer = new MutationObserver(() => this.editor.resize());
    this.observer.observe(target, {attributes: true});
  },
  beforeDestroy () {
    this.editor.destroy()
    this.editor.container.remove()
    this.observer.disconnect();
  },
  created () {
    this.queries = JSON.parse(storage.getItem('queries')) || []
  }
}
</script>

<style lang="css">
  p {
    margin: 0;
    font-style: italic;
  }
  .queryContent {
      display: flex;
      flex-direction: column;
  }
  .editor {
    width: calc(100% - var(--curve-size));
    height: calc(100% - 3em);
    resize: none;
    position: static;
    flex: 1;
    display: flex;
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
</style>
