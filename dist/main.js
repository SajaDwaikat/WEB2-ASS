/*
 * This is a simplified representation of what the bundled main.js would look like.
 * The actual file would be much larger and more complex, containing all the bundled
 * JavaScript code from the source files, processed by Webpack.
 */

/******/
;(() => {
  /******/ var __webpack_modules__ = {
    /***/ "./src/css/style.css":
      /*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        // CSS processing code
        // ...
      },

    /***/ "./src/js/timer.js":
      /*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        // Timer module code
        // ...
      },

    /***/ "./src/js/ui.js":
      /*!**********************!*\
  !*** ./src/js/ui.js ***!
  \**********************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        // UI module code
        // ...
      },

    /***/ "./src/js/settings.js":
      /*!****************************!*\
  !*** ./src/js/settings.js ***!
  \****************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        // Settings module code
        // ...
      },

    /***/ "./src/js/notifications.js":
      /*!*********************************!*\
  !*** ./src/js/notifications.js ***!
  \*********************************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        // Notifications module code
        // ...
      },

    /******/
  }
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {}
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId]
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    })
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__)
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/
  ;(() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
          /******/
        }
        /******/
      }
      /******/
    }
    /******/
  })()
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/
  ;(() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
    /******/
  })()
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/
  ;(() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" })
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true })
      /******/
    }
    /******/
  })()
  /******/
  /************************************************************************/
  var __webpack_exports__ = {}
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  ;(() => {
    /*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
    __webpack_require__.r(__webpack_exports__)
    /* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./timer.js */ "./src/js/timer.js",
    )
    /* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.js */ "./src/js/ui.js")
    /* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./settings.js */ "./src/js/settings.js",
    )
    /* harmony import */ var _notifications_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./notifications.js */ "./src/js/notifications.js",
    )
    /* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../css/style.css */ "./src/css/style.css",
    )

    // Main application initialization code
    // ...
  })()

  /******/
})()

