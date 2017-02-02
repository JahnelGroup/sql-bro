/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _electron = __webpack_require__(1);\n\nvar _path = __webpack_require__(2);\n\nvar _path2 = _interopRequireDefault(_path);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar mainWindow = void 0;\n\n_electron.app.on('ready', function () {\n  mainWindow = new _electron.BrowserWindow({\n    width: 1024,\n    height: 768\n  });\n\n  var mainURL =  true ? 'http://localhost:' + (8085) + '/main.html' : 'file://' + _path2.default.join(__dirname, 'main.html');\n\n  mainWindow.loadURL(mainURL);\n\n  if (true) {\n    mainWindow.openDevTools();\n  }\n\n  mainWindow.on('closed', function () {\n    mainWindow = null;\n  });\n});\n\n_electron.app.on('window-all-closed', function () {\n  _electron.app.quit();\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvYmFja2dyb3VuZC5qcz8wNWVlIl0sIm5hbWVzIjpbIm1haW5XaW5kb3ciLCJvbiIsIndpZHRoIiwiaGVpZ2h0IiwibWFpblVSTCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJsb2FkVVJMIiwib3BlbkRldlRvb2xzIiwicXVpdCJdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsbUJBQUo7O0FBRUEsY0FBSUMsRUFBSixDQUFPLE9BQVAsRUFBZ0IsWUFBTTtBQUNwQkQsZUFBYSw0QkFBa0I7QUFDN0JFLFdBQU8sSUFEc0I7QUFFN0JDLFlBQVE7QUFGcUIsR0FBbEIsQ0FBYjs7QUFPQSxNQUFNQyxVQUFVLDhCQUNRLE1BRFIsa0JBRVosWUFBWSxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsV0FBckIsQ0FGaEI7O0FBSUFOLGFBQVdPLE9BQVgsQ0FBbUJILE9BQW5COztBQUVBLE1BQUksSUFBSixFQUEyQztBQUN6Q0osZUFBV1EsWUFBWDtBQUNEOztBQUVEUixhQUFXQyxFQUFYLENBQWMsUUFBZCxFQUF3QixZQUFNO0FBQzVCRCxpQkFBYSxJQUFiO0FBQ0QsR0FGRDtBQUdELENBckJEOztBQXVCQSxjQUFJQyxFQUFKLENBQU8sbUJBQVAsRUFBNEIsWUFBTTtBQUNoQyxnQkFBSVEsSUFBSjtBQUNELENBRkQiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgaXMgbWFpbiBwcm9jZXNzIG9mIEVsZWN0cm9uLCBzdGFydGVkIGFzIGZpcnN0IHRoaW5nIHdoZW4geW91clxuLy8gYXBwIHN0YXJ0cy4gVGhpcyBzY3JpcHQgaXMgcnVubmluZyB0aHJvdWdoIGVudGlyZSBsaWZlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4vLyBJdCBkb2Vzbid0IGhhdmUgYW55IHdpbmRvd3Mgd2hpY2ggeW91IGNhbiBzZWUgb24gc2NyZWVuLCBidXQgd2UgY2FuIG9wZW5cbi8vIHdpbmRvdyBmcm9tIGhlcmUuXG5cbmltcG9ydCB7IGFwcCwgQnJvd3NlcldpbmRvdyB9IGZyb20gJ2VsZWN0cm9uJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxubGV0IG1haW5XaW5kb3dcblxuYXBwLm9uKCdyZWFkeScsICgpID0+IHtcbiAgbWFpbldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHtcbiAgICB3aWR0aDogMTAyNCxcbiAgICBoZWlnaHQ6IDc2OFxuICB9KVxuXG4gIC8vIExvYWQgdGhlIEhUTUwgZmlsZSBkaXJlY3RseSBmcm9tIHRoZSB3ZWJwYWNrIGRldiBzZXJ2ZXIgaWZcbiAgLy8gaG90IHJlbG9hZCBpcyBlbmFibGVkLCBvdGhlcndpc2UgbG9hZCB0aGUgbG9jYWwgZmlsZS5cbiAgY29uc3QgbWFpblVSTCA9IHByb2Nlc3MuZW52LkhPVFxuICAgID8gYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwcm9jZXNzLmVudi5QT1JUfS9tYWluLmh0bWxgXG4gICAgOiAnZmlsZTovLycgKyBwYXRoLmpvaW4oX19kaXJuYW1lLCAnbWFpbi5odG1sJylcblxuICBtYWluV2luZG93LmxvYWRVUkwobWFpblVSTClcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIG1haW5XaW5kb3cub3BlbkRldlRvb2xzKClcbiAgfVxuXG4gIG1haW5XaW5kb3cub24oJ2Nsb3NlZCcsICgpID0+IHtcbiAgICBtYWluV2luZG93ID0gbnVsbFxuICB9KVxufSlcblxuYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsICgpID0+IHtcbiAgYXBwLnF1aXQoKVxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = require(\"electron\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiPzY5MjgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZWxlY3Ryb25cIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = require(\"path\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCI/NWIyYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);