# SQL bro

> Do you even?

![alt text](https://media.giphy.com/media/JHIs9ykOOSJ8I/giphy.gif "Come at me, Bro!")

A bare bones SQL client.
This was built for Jahnel Group’s 2017 War Week, to satisfy my own desire for an SQL client that would make those things I need to do frequently as a mid-tier developer easy - without preventing doing anything else - with a minimal interface. It was also built to learn more about the Electron platform, practice using Vue.js, and try out a new styling framework.
Built on electron-boilerplate-vue.

## Prior Art
* Sqlectron (https://github.com/sqlectron) - a similar project, better executed. ;-)
* Sequel Pro - much of the UI inspiration.
* MySql Workbench - "The Bench."


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/en/npm_scripts.html).

---


## TODOS

High:
* Flesh out grid component: (exports as right-click); inline editing issuing an "update")
* Make "multiple" response object into tabs.
* Show other "objects" under schemas:  triggers, events? with good icons.
* Add Tests for days.
* Add flyway integration?! Show what migration you're on, and if there are others to do: clean/migrate (dev/testing only! No prod!)
* Move the passwords out of localstorage into `https://github.com/atom/node-keytar`.
* Table Inspection: a way to see table's indexes, triggers, keys, columns, etc.
* Add tagged groups to tables (i.e., a way to put tables into folders)

Med:
* Adapt grid output (dates, bools, NULL (Add color!)) to better representation.
* lock header at top!
* Fix up QueryCompleter with a regex against prefix to add tables/columns. Maybe turn on auto?
* add VARIABLE support to query window? What what!
* Search option: find column (in all tables/procs)
* Work on ReadMe. Follow guide below; change what's needed.
* Sort on column header? (reissue with `SELECT * FROM (query) ORDER BY header`)
* Find a way to report OS errors back to the UI, such as during the writes to logs

Low:
* add multiple DB types (sql server, at least. mongO?)
* Styling for days.
* Easter eggs?
* `https://github.com/vue-comps/vue-resize-handle` ?


---
This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
