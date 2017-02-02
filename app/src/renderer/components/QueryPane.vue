<template lang="html">
    <div class="queryContent">
        <p>Ctrl-Enter to run selection or full editor; Ctrl-space to autocomplete.</p>
        <div class="editor">
            <div id="editor"></div>
        </div>
        <div class="button-group">
        <button type="button" @click="executeQuery">
            <i class="fa fa-bolt" aria-hidden="true"></i> Run</button>
        <button type="button" >
            <i class="fa fa-save" aria-hidden="true"></i> Save</button>
        <select class="" name="">
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
      editor: null
    }
  },
  methods: {
    executeQuery () {
      const query = this.editor.session.getTextRange(this.editor.getSelectionRange()) ||
          this.editor.getValue()
      dbConnection.runQuery(query)
        .then(bus.setCurrentResults)
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
  },
  beforeDestroy () {
    this.editor.destroy()
    this.editor.container.remove()
  }
}
</script>

<style lang="css">
  /*textarea {
      font-family: monospace;
      width: calc(100% - var(--curve-size));
      overflow: scroll;
      resize: none;
      height: calc(100% - 32px);
      overflow-x: hidden;
  }*/
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
