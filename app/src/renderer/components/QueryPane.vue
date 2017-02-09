<template lang="html">
    <div @mousemove.self="conditionalResize($event)">
        <p>Ctrl-Enter to run selection or full editor; Ctrl-space to autocomplete.</p>
        <div class="editor">
            <div id="editor"></div>
        </div>
        <div class="button-group">
          <button type="button" class="pure-button" @click="executeQuery">
            <span v-if="running">
              <i class="fa fa-refresh fa-spin fa-fw" aria-hidden="true"></i>
              <span class="sr-only">Running Query...</span></span>
            <span v-else><i class="fa fa-bolt" aria-hidden="true"></i> Run</span>
          </button>
          <button type="button" class="pure-button">
              <i class="fa fa-save" aria-hidden="true"></i> Save</button>
          <select class="" name="">
              Saved Queries
          </select>
        </div>
    </div>
</template>

<script>
import dbConnection from '../db'
import bus from '../bus'
import completer from '../QueryCompleter'

require('brace/mode/sql')
require('brace/ext/language_tools.js') // autocomplete
require('brace/ext/searchbox')
import ace from 'brace'
const langtools = ace.acequire('ace/ext/language_tools')
langtools.addCompleter(completer)

ace.acequire('ace/ext/searchbox')


export default {
  data: function () {
    return {
      editor: null,
      running: false,
      height: 0
    }
  },
  methods: {
    executeQuery () {
      const query = this.editor.session.getTextRange(this.editor.getSelectionRange()) ||
          this.editor.getValue()
      this.running = true;
      dbConnection.runQuery(query)
        .then(bus.setCurrentResults)
        .then(() => this.running = false)
    },
    conditionalResize (e) {
      if (e.target.clientHeight != this.height) {
        this.height = e.target.clientHeight
        console.log('resizing!')
        this.editor.resize()
      }
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
      exec: this.executeQuery
    })
  },
  beforeDestroy () {
    this.editor.destroy()
    this.editor.container.remove()
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
</style>
