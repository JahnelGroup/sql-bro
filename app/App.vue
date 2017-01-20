<template>
  <app-header></app-header>
  <main class="flex-container horizontal"
      v-if="connection">
    <schema-list></schema-list>
    <div class="flex-container vertical">
      <query-pane></query-pane>
      <results></results>
    </div>
  </main>
  <app-footer></app-footer>
</template>

<script>
  import Footer from './components/Footer'
  import Hello from './components/Hello'
  import Header from './components/Header'
  import SchemaList from './components/SchemaList'
  import QueryPane from './components/QueryPane'
  import Results from './components/Results'
  import bus from './bus'

  export default {
    components: {
      appFooter: Footer,
      Hello,
      appHeader: Header,
      SchemaList,
      QueryPane,
      Results
    },
    computed: {
      connection () {
        debugger
        return bus.connection
      }
    }
  }
</script>

<style>

  html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  /*#app {
    max-width: 600px;
    font-family: Helvetica, sans-serif;
    text-align: center;
  }*/
  main {
      flex: 1;
  }

  .flex-container {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
  }
  .vertical {
      flex-direction: column;
  }
  .horizontal {
      flex-direction: row;
  }
</style>
