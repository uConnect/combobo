(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Combobo"] = factory();
	else
		root["Combobo"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ClassList

var indexOf = __webpack_require__(4),
    trim = __webpack_require__(5),
    arr = Array.prototype

/**
 * ClassList(elem) is kind of like Element#classList.
 *
 * @param {Element} elem
 * @return {ClassList}
 */
function ClassList (elem) {
  if (!(this instanceof ClassList))
    return new ClassList(elem)

  var classes = trim(elem.className).split(/\s+/),
      i

  this._elem = elem

  this.length = 0

  for (i = 0; i < classes.length; i += 1) {
    if (classes[i])
      arr.push.call(this, classes[i])
  }
}

/**
 * add(class1 [, class2 [, ...]]) adds the given class(es) to the
 * element.
 *
 * @param {String} ...
 * @return {Context}
 */
ClassList.prototype.add = function () {
  var name,
      i

  for (i = 0; i < arguments.length; i += 1) {
    name = '' + arguments[i]

    if (indexOf(this, name) >= 0)
      continue

    arr.push.call(this, name)
  }

  this._elem.className = this.toString()

  return this
}

/**
 * remove(class1 [, class2 [, ...]]) removes the given class(es) from
 * the element.
 *
 * @param {String} ...
 * @return {Context}
 */
ClassList.prototype.remove = function () {
  var index,
      name,
      i

  for (i = 0; i < arguments.length; i += 1) {
    name = '' + arguments[i]
    index = indexOf(this, name)

    if (index < 0) continue

    arr.splice.call(this, index, 1)
  }

  this._elem.className = this.toString()

  return this
}

/**
 * contains(name) determines if the element has a given class.
 *
 * @param {String} name
 * @return {Boolean}
 */
ClassList.prototype.contains = function (name) {
  name += ''
  return indexOf(this, name) >= 0
}

/**
 * toggle(name [, force]) toggles a class. If force is a boolean,
 * this method is basically just an alias for add/remove.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {Context}
 */
ClassList.prototype.toggle = function (name, force) {
  name += ''

  if (force === true) return this.add(name)
  if (force === false) return this.remove(name)

  return this[this.contains(name) ? 'remove' : 'add'](name)
}

/**
 * toString() returns the className of the element.
 *
 * @return {String}
 */
ClassList.prototype.toString = function () {
  return arr.join.call(this, ' ')
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = rndid;

/**
 * Generates a random ID of a specified length that begins with a letter.
 * This is necessary because HTML ID attributes cannot start with a number.
 * 
 * @param {number} len The desired length of the ID. Defaults to 8.
 * @return {string} A unique ID that begins with a letter.
 */
function rndid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

  // Define the characters for the first character (letter)
  var baseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  // Define the characters for the rest of the ID (letters and numbers)
  var allChars = baseChars + '0123456789';

  // Ensure the first character is a letter
  var id = baseChars.charAt(Math.floor(Math.random() * baseChars.length));

  // Generate the rest of the ID, which can include both letters and numbers
  for (var i = 1; i < len; i++) {
    id += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  if (document.getElementById(id)) {
    return rndid(len); // Recursively generate a new ID if the current one already exists
  }

  return id;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(23);

module.exports = function extend(o/*, objects*/) {
  if (!isObject(o)) { o = {}; }

  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    var obj = arguments[i];

    if (isObject(obj)) {
      assign(o, obj);
    }
  }
  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classlist = __webpack_require__(0);

var _classlist2 = _interopRequireDefault(_classlist);

var _componentEmitter = __webpack_require__(6);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _liveRegion = __webpack_require__(7);

var _liveRegion2 = _interopRequireDefault(_liveRegion);

var _scrolltoElement = __webpack_require__(8);

var _scrolltoElement2 = _interopRequireDefault(_scrolltoElement);

var _isScrolledInView = __webpack_require__(9);

var _isScrolledInView2 = _interopRequireDefault(_isScrolledInView);

var _viewportStatus = __webpack_require__(10);

var _viewportStatus2 = _interopRequireDefault(_viewportStatus);

var _filters = __webpack_require__(11);

var _filters2 = _interopRequireDefault(_filters);

var _keyvent = __webpack_require__(13);

var _keyvent2 = _interopRequireDefault(_keyvent);

var _isWithin = __webpack_require__(15);

var _isWithin2 = _interopRequireDefault(_isWithin);

var _elementHandler = __webpack_require__(16);

var _elementHandler2 = _interopRequireDefault(_elementHandler);

var _currentGroup = __webpack_require__(18);

var _currentGroup2 = _interopRequireDefault(_currentGroup);

var _noResults = __webpack_require__(19);

var _noResults2 = _interopRequireDefault(_noResults);

var _attributes = __webpack_require__(20);

var _attributes2 = _interopRequireDefault(_attributes);

var _wrapMatch = __webpack_require__(21);

var _wrapMatch2 = _interopRequireDefault(_wrapMatch);

var _config = __webpack_require__(22);

var _config2 = _interopRequireDefault(_config);

var _announceActive = __webpack_require__(24);

var _announceActive2 = _interopRequireDefault(_announceActive);

var _rndid = __webpack_require__(1);

var _rndid2 = _interopRequireDefault(_rndid);

var _extendShallow = __webpack_require__(2);

var _extendShallow2 = _interopRequireDefault(_extendShallow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * /////////////////////////
 * //////// COMBOBO ////////
 * /////////////////////////
 *
 *           ."`".
 *       .-./ _=_ \.-.
 *      {  (,(oYo),) }}
 *      {{ |   "   |} }
 *      { { \(---)/  }}
 *      {{  }'-=-'{ } }
 *      { { }._:_.{  }}
 *      {{  } -:- { } }
 *      {_{ }`===`{  _}
 *     ((((\)     (/))))
 */

module.exports = function () {

  /**
   * Combobo constructor
   *
   * @param {import('./lib/config').ComboboConfig} Config
   * @returns {Combobo|Object}
   */
  function Combobo(config) {
    var _this = this;

    _classCallCheck(this, Combobo);

    config = config || {};

    /**
     * Merge user's config with defaults
     *
     * @type {import('./lib/config').ComboboConfig}
     */
    this.config = (0, _config2.default)(config);

    /**
     * The current open state of the Combobo
     *
     * @default false
     * @type {Boolean}
     */
    this.isOpen = false;
    /**
     * @type {HTMLDivElement|null}
     */
    this.currentOption = null;
    /**
     * @type {HTMLSelectElement|null}
     */
    this.selectElm = null;
    /**
     * @type {HTMLDivElement[]|[]}
     */
    this.selected = [];
    /**
     * @type {HTMLDivElement|HTMLInputElement|null}
     */
    this.input = null;
    this.inputElm = null;
    /**
     * @type {Object[]|[]}
     * @property {HTMLDivElement} element
     * @property {HTMLDivElement[]} options
     */
    this.groups = [];
    /**
     * @type {Boolean}
     */
    this.isHovering = false;
    /**
     * @type {Boolean}
     */
    this.autoFilter = this.config.autoFilter;
    /**
     * @type {Set<number>}
     */
    this.optionsWithEventHandlers = new Set();
    /**
     * @type {Set<number>}
     */
    this.optionsWithKeyEventHandlers = new Set();
    /**
     * @type {HTMLDivElement[]|[]}
     */
    this.cachedOpts = [];

    /**
     * @type {HTMLSpanElement|null}
     */
    this.toggleButton = null;

    /**
     * @type {Boolean}
     * @default false
     */
    this.disabled = this.config.disabled;

    /**
     * @type {HTMLDivElement}
     */
    this.list;

    if (!this.config.internalCall) {
      var combobos = {};

      var selectElements = (0, _elementHandler2.default)(this.config.select, true);
      var inputElements = (0, _elementHandler2.default)(this.config.input, true);

      if (inputElements && inputElements.length && !this.config.select.startsWith('#')) {
        inputElements.forEach(function (input) {
          var config = Object.assign({}, _this.config);

          // If selectOnly is true, change the <input> to a <div>.
          // Force <select>-like behavior by overriding the `filter` and `autoFilter` options.
          if (_this.config.selectOnly) {
            config.filter = 'starts-with';
            config.autoFilter = false;

            if (input.tagName.toLowerCase() === 'input') {
              config.inputElm = input;
              var inputDivEl = document.createElement('div');

              // Copy attributes from the <input> to the <div>, except for `type` and `value`
              [].concat(_toConsumableArray(input.attributes)).forEach(function (attr) {
                if (['type', 'value'].includes(attr.name)) {
                  return;
                }
                inputDivEl.setAttribute(attr.name, attr.value);
              });

              config.inputElm.style.display = 'none';
              config.inputElm.insertAdjacentElement('afterend', inputDivEl);

              inputDivEl.setAttribute('tabindex', '0');
              inputDivEl.id = input.id + '-combobo'; // Prevent duplicate IDs with hidden <input>

              // Rewrite the label's `for` attribute to match the new combobox <div>'s ID
              _this.reassignLabel(input, inputDivEl);

              input = inputDivEl;
            }
          }

          input.id = input.id || (0, _rndid2.default)();
          config.input = input;
          config.internalCall = true;
          combobos[input.id] = new Combobo(config);
        });
      }
      if (selectElements && selectElements.length && !this.config.input.startsWith('#')) {
        selectElements.forEach(function (selectElement) {
          selectElement.id = selectElement.id || (0, _rndid2.default)();
          // To ensure that the combobo reinitializes when initialized
          var initializedCombobo = document.getElementById(selectElement.id + '-combobo');
          if (initializedCombobo) {
            initializedCombobo.remove();
          }

          var transformData = _this.transformSelectElement(selectElement);
          selectElement.parentNode.insertBefore(transformData.comboElement, selectElement.nextSibling);
          var config = Object.assign({}, _this.config);
          config.input = transformData.input;
          config.select = selectElement;
          config.multiselect = selectElement.multiple;
          config.internalCall = true;
          selectElement.style.display = "none";
          config.placeholderText = selectElement.getAttribute('placeholder') || config.placeholderText;
          combobos[selectElement.id] = new Combobo(config);
        });
      }

      if (Object.keys(combobos).length) {
        if (Object.keys(combobos).length == 1) {
          return combobos[Object.keys(combobos)[0]];
        }
        return combobos;
      }
    }

    this.input = (0, _elementHandler2.default)(this.config.input);
    this.selectElm = (0, _elementHandler2.default)(this.config.select);
    this.toggleButtonIcon = this.config.toggleButtonIcon;
    // The list and toggle button should be within the parent of Input.
    if (this.input && this.input.parentNode) {
      this.list = (0, _elementHandler2.default)(this.config.list, false, this.input.parentNode);
      this.toggleButton = (0, _elementHandler2.default)(this.config.toggleButton, false, this.input.parentNode);

      // If there is a custom icon for the toggle button, set it
      if (this.config.toggleButtonIcon) {
        this.toggleButton.innerHTML = this.config.toggleButtonIcon;
      }
    }

    if (this.config.multiselect) {
      this.input.classList.add('multiselect');
    }

    if (!this.input || !this.list) {
      throw new Error('Unable to find required elements (list/input)');
    }

    if (this.config.source && Array.isArray(this.config.source)) {
      // First remove all child elements in the dropdown list
      this.emptyDropdownList();
      while (this.list.hasChildNodes()) {
        this.list.removeChild(this.list.firstChild);
      }

      this.currentOpts = [];
      this.config.source.forEach(function (option) {
        if (option.label && option.options) {
          // If option is an optgroup
          var optgroupElm = _this.createOptgroupElement(option.label);
          option.options.forEach(function (opt) {
            var optionElm = _this.createOptionElement(opt.text, opt.value, opt.selected, opt.disabled);
            optgroupElm.append(optionElm); // Add option to optgroup
            _this.currentOpts.push(optionElm);
          });
          _this.list.append(optgroupElm); // Add optgroup to the list
        } else {
          // If option is a standalone option
          var optionElm = _this.createOptionElement(option.text, option.value, option.selected, option.disabled);
          _this.list.append(optionElm);
          _this.currentOpts.push(optionElm);
        }
      });

      this.cachedOpts = this.currentOpts;
    } else {
      this.cachedOpts = this.currentOpts = (0, _elementHandler2.default)(this.config.options, true, this.list);
    }

    if (this.config.placeholderText) {
      this.addPlaceholder();
    }

    // option groups
    if (this.config.groups) {
      var groupEls = (0, _elementHandler2.default)(this.config.groups, true, this.list);
      this.groups = groupEls.map(function (groupEl) {
        return {
          element: groupEl,
          options: _this.cachedOpts.filter(function (opt) {
            return groupEl.contains(opt);
          })
        };
      });
    }

    (0, _attributes2.default)(this.input, this.list, this.cachedOpts);

    if (this.config.useLiveRegion) {
      this.liveRegion = new _liveRegion2.default({ ariaLive: 'assertive' });
    }

    this.initEvents();

    if (this.config.disabled || this.selectElm && this.selectElm.disabled) {
      this.disable();
    }

    // Initialize the selected based on the selected options.
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.currentOpts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var option = _step.value;

        if (option.classList.contains(this.config.selectedClass)) {
          this.currentOption = option;
          this.select();
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  /**
   * Reassign the label when the original combobox markup has been transformed. This will always
   * happen for <select> elements, but may also happen for <input> elements if the `selectOnly`
   * option is enabled.
   *
   * If there is a paired <label> element whose `for` matches the `id` of the original
   * input element, it will be reassigned to the new combobox element. Otherwise, if a <label> is a
   * previous sibling of the original input element, the `for` attribute will be added and
   * referenced to the new combobox element.
   *
   * To be extra-safe, the `aria-labelledby` attribute will be added to the new combobox element.
   * A randomized `id` attribute will be added to the <label> if it doesn't already have one.
   *
   * @param {*} el The <input> or <select> element
   * @param {*} newEl The newly-created or transformed combobox
   */


  _createClass(Combobo, [{
    key: 'reassignLabel',
    value: function reassignLabel(el, newEl) {
      var newElId = newEl.id;
      var label = el.labels[0] || el.previousElementSibling.tagName.toLowerCase() === 'label';
      if (label) {
        label.htmlFor = newElId;

        var labelId = label.id || (0, _rndid2.default)();

        if (!label.id) {
          label.id = labelId;
        }

        newEl.setAttribute('aria-labelledby', labelId);
      }
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      var _this2 = this;

      (0, _componentEmitter2.default)(this);
      if (!this.optionsWithKeyEventHandlers.has(this.input)) {
        this.addEvent('click', this.input, this.handleInputClick);
        this.addEvent('blur', this.input, this.handleInputBlur);
        this.addEvent('focus', this.input, this.handleInputFocus);

        if (this.toggleButton) {
          // Handle trigger clicks to toggle the open state of the Combobo
          this.addEvent('click', this.toggleButton, this.handleToggleButtonClick);
          // Add mouse handlers so the blur on the input doesn't close the list prematurely
          this.addEvent('mouseover', this.toggleButton, this.setHovering);
          this.addEvent('mouseout', this.toggleButton, this.setNotHovering);
        }

        // listen for clicks outside of combobox
        document.addEventListener('click', function (e) {
          var isOrWithin = (0, _isWithin2.default)(e.target, [_this2.input, _this2.list, _this2.toggleButton], true);
          if (!isOrWithin && _this2.isOpen) {
            _this2.closeList();
          }
        });
      }

      this.optionEvents();
      this.initKeys();

      return this;
    }
  }, {
    key: 'addEvent',
    value: function addEvent(event, element) {
      var _this3 = this;

      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      if (element) {
        element.addEventListener(event, function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this3.eventWrapper.apply(_this3, [cb].concat(args));
        });
      }
    }

    /**
     * 
     * @param {Function} cb 
     * @param {any[]} binds
     */

  }, {
    key: 'eventWrapper',
    value: function eventWrapper(cb) {
      if (this.disabled) {
        return;
      }

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return cb.bind(this).apply(undefined, args);
    }
  }, {
    key: 'setHovering',
    value: function setHovering() {
      this.isHovering = true;
    }
  }, {
    key: 'setNotHovering',
    value: function setNotHovering() {
      this.isHovering = false;
    }

    /**
     * Toggles the open state of the combobo when the toggle button is clicked.
     * 
     * @param {MouseEvent} e 
     */

  }, {
    key: 'handleToggleButtonClick',
    value: function handleToggleButtonClick(e) {
      if (this.disabled) {
        return;
      }

      e.stopPropagation();
      if (this.isOpen) {
        this.closeList();
      } else {
        this.openList().input.focus();
      }
    }
  }, {
    key: 'handleInputClick',
    value: function handleInputClick() {
      if (this.disabled) {
        return;
      }
      this.openList().goTo(this.getOptIndex() || 0); // ensure it's open
    }
  }, {
    key: 'handleInputBlur',
    value: function handleInputBlur() {
      if (!this.isHovering) {
        this.closeList();
      }
    }
  }, {
    key: 'handleInputFocus',
    value: function handleInputFocus() {
      if (this.disabled) {
        return;
      }
      if (this.selected.length) {
        this.input.value = this.selected.length >= 2 ? '' : this.config.selectionValue(this.selected);
      }
      if (!this.config.selectOnly) {
        this.input.select();
      }
    }
  }, {
    key: 'getOptIndex',
    value: function getOptIndex() {
      return this.currentOption && this.currentOpts.indexOf(this.currentOption);
    }
  }, {
    key: 'optionEvents',
    value: function optionEvents() {
      var _this4 = this;

      this.cachedOpts.forEach(function (option) {
        _this4.addEventsToOptionEl(option);
      });
      return this;
    }

    /**
     * Adds event handlers to the option element
     * 
     * @param {HTMLDivElement} option 
     */

  }, {
    key: 'addEventsToOptionEl',
    value: function addEventsToOptionEl(option) {
      if (!this.optionsWithEventHandlers.has(option.id) && !this.selected.includes(option)) {
        option.addEventListener('click', this.handleOptionClick.bind(this, option));
        option.addEventListener('mouseover', this.handleOptionMouseOver.bind(this, option));
        option.addEventListener('mouseout', this.handleOptionMouseOut.bind(this, option));

        this.optionsWithEventHandlers.add(option.id);
      }
    }

    /**
     * @param {HTMLDivElement} option 
     */

  }, {
    key: 'handleOptionClick',
    value: function handleOptionClick(option) {
      this.goTo(this.currentOpts.indexOf(option)).select();
    }

    /**
     * @param {HTMLDivElement} option 
     */

  }, {
    key: 'handleOptionMouseOver',
    value: function handleOptionMouseOver(option) {
      // clean up
      var prev = this.currentOption;

      if (prev) {
        prev.classList.remove(this.config.activeClass);
      }
      option.classList.add(this.config.activeClass);
      this.isHovering = true;
    }

    /**
     * @param {HTMLDivElement} option 
     */

  }, {
    key: 'handleOptionMouseOut',
    value: function handleOptionMouseOut(option) {
      option.classList.remove(this.config.activeClass);
      this.isHovering = false;
    }
  }, {
    key: 'openList',
    value: function openList() {
      (0, _classlist2.default)(this.list).add(this.config.openClass);
      this.input.setAttribute('aria-expanded', 'true');
      if (!this.isOpen) {
        // announcing count
        this.announceCount();
      }
      this.isOpen = true;
      this.emit('list:open');
      var status = (0, _viewportStatus2.default)(this.list);
      if (!status.visible) {
        var offset = status.position === 'bottom' ? 0 - (window.innerHeight - (this.input.clientHeight + this.list.clientHeight)) : 0;

        (0, _scrolltoElement2.default)({
          element: this.input,
          offset: offset,
          bezier: [0.19, 1, 0.22, 1],
          duration: 100
        });
      }

      return this;
    }
  }, {
    key: 'closeList',
    value: function closeList(focus, selectText) {
      (0, _classlist2.default)(this.list).remove(this.config.openClass);
      this.input.setAttribute('aria-expanded', 'false');
      this.isOpen = false;
      if (focus) {
        this.input.focus();
      }
      // Set the value back to what it was
      if (!this.multiselect && this.selected.length) {
        this.input.value = this.config.selectionValue(this.selected);
      }
      if (selectText && !this.config.selectOnly) {
        this.input.select();
      }
      this.emit('list:close');
      return this;
    }
  }, {
    key: 'getSearchString',
    value: function getSearchString(char) {
      var _this5 = this;

      if (!char) {
        return this.searchString;
      }
      // Reset typing timeout and start new timeout
      // This allows us to make multiple-letter matches, like a native <select>
      if (typeof this.searchTimeout === 'number') {
        window.clearTimeout(this.searchTimeout);
      }

      this.searchTimeout = window.setTimeout(function () {
        _this5.searchString = '';
      }, this.config.selectSearchTimeout);

      // Add most recent letter to saved search string
      this.searchString = this.searchString ? this.searchString + char : char;
      return this.searchString.toLowerCase();
    }
  }, {
    key: 'initKeys',
    value: function initKeys() {
      var _this6 = this;

      // keydown listener
      if (this.optionsWithKeyEventHandlers.has(this.input)) {
        return;
      } else {
        this.optionsWithKeyEventHandlers.add(this.input);
      }
      _keyvent2.default.down(this.input, [{
        keys: ['up', 'down'],
        callback: function callback(e, k) {
          if (_this6.isOpen) {
            // if typing filtered out the pseudo-current option
            if (_this6.currentOpts.indexOf(_this6.currentOption) === -1) {
              return _this6.goTo(0, true);
            }
            return _this6.goTo(k === 'down' ? 'next' : 'prev', true);
          }

          var idx = _this6.selected.length ? _this6.currentOpts.indexOf(_this6.selected[_this6.selected.length - 1]) : 0;

          _this6.goTo(idx, true).openList();
        },
        preventDefault: true
      }, {
        keys: ['enter'],
        callback: function callback() {
          if (_this6.isOpen) {
            _this6.select();
          } else {
            _this6.openList();
          }
        }
      }, {
        keys: ['escape'],
        callback: function callback(e) {
          if (_this6.isOpen) {
            e.stopPropagation();
            _this6.closeList(true, true);
          }
        }
      }, {
        keys: ['backspace'],
        callback: function callback() {
          if (_this6.selected.length >= 2) {
            _this6.input.value = '';
          }
        }
      }]);

      /**
       * Stop spacebar from scrolling the page when an input is focused and/or open the list
       */
      _keyvent2.default.down(window, function (e) {
        var key = e.key;

        if (key === ' ' && e.target === _this6.input) {
          if (_this6.config.selectOnly) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (!_this6.isOpen) {
            _this6.openList();
          }
        }
      });

      _keyvent2.default.down(this.input, function (e) {
        var key = e.key,
            metaKey = e.metaKey,
            ctrlKey = e.ctrlKey,
            altKey = e.altKey;

        if (metaKey || ctrlKey || altKey) {
          return;
        }

        if (key && [' ', 'tab', 'backspace'].includes(key.toLowerCase()) && _this6.isOpen) {
          // Don't close (+select) the list if the user is typing in the input
          if (!_this6.config.selectOnly && key.toLowerCase() === 'backspace') {
            return;
          }

          e.preventDefault();
          e.stopPropagation();
          _this6.select();
          _this6.closeList();
        }
      });

      if (this.config.selectOnly) {
        _keyvent2.default.up(this.input,
        /**
        * @param {KeyboardEvent} e
        */
        function (e) {
          var key = e.key,
              altKey = e.altKey,
              ctrlKey = e.ctrlKey,
              metaKey = e.metaKey;

          var alpha = new Array(26).fill(1).map(function (_, i) {
            return String.fromCharCode('a'.charCodeAt(0) + i);
          });

          if (!alpha.includes(key) || key === ' ' || altKey || ctrlKey || metaKey) {
            return;
          }

          e.preventDefault();
          e.stopPropagation();

          var searchString = _this6.getSearchString(key);

          if (!_this6.isOpen) {
            _this6.openList();
          }

          var searchIndex = _this6.searchIndex(searchString);
          if (searchIndex > -1) {
            _this6.goTo(searchIndex);
          }
        });

        this.input.addEventListener('blur', function () {
          _this6.searchString = '';
          if (_this6.selected.length) {
            _this6.input.innerText = _this6.config.selectionValue(_this6.selected);
          }
        });
      }

      // ignore tab, enter, escape and shift
      var ignores = [9, 13, 27, 16];
      // filter keyup listener
      _keyvent2.default.up(this.input, function (e) {
        // If autoFilter is false, key up filter not required
        if (!_this6.autoFilter) {
          return;
        }
        var filter = _this6.config.filter;
        var cachedVal = _this6.cachedInputValue;
        if (ignores.indexOf(e.which) > -1 || !filter || _this6.input.tagName.toLowerCase() === 'div') {
          return;
        }

        // Handles if there is a fresh selection
        if (_this6.freshSelection) {
          _this6.clearFilters();
          if (cachedVal && cachedVal.trim() !== _this6.input.value.trim()) {
            // if the value has changed...
            _this6.filter().openList();
            _this6.freshSelection = false;
          }
        } else {
          _this6.filter().openList();
        }

        // handle empty results
        (0, _noResults2.default)(_this6.list, _this6.currentOpts, _this6.config.noResultsText);
      });
    }

    // Keep track of the search string for a more <select>-like experience

  }, {
    key: 'searchIndex',
    value: function searchIndex(searchString) {
      var currentIndex = this.getOptIndex();
      var queryString = searchString.trim();
      var firstLetter = queryString[0];
      var isRepeatedLetter = queryString === firstLetter.repeat(queryString.length) && queryString.length > 1;

      // All possible matches; we'll cycle through them if the user presses the same letter multiple times.
      var matches = this.currentOpts.filter(function (opt) {
        return opt.textContent.toLowerCase().startsWith(isRepeatedLetter ? firstLetter : queryString);
      });

      // No matches found
      if (matches.length === 0) {
        return -1;
      }

      // Only one match found; use that
      if (matches.length === 1) {
        return this.currentOpts.indexOf(matches[0]);
      }

      // If the current option is not in the matches, return the first match
      if (currentIndex === -1) {
        return this.currentOpts.indexOf(matches[0]);
      }

      var matchIndex = matches.indexOf(this.currentOption);

      // If the query string is a repeated letter, pick the next match in the list
      // If that option doesn't exist, pick the first match again
      if (isRepeatedLetter && matches.length > 1) {
        return this.currentOpts.indexOf(matches[matchIndex + 1] || matches[0]);
      }

      if (matchIndex !== -1 && matchIndex < matches.length - 1) {
        return this.currentOpts.indexOf(matches[0]);
      }

      return this.currentOpts.indexOf(matches[matchIndex + 1] || matches[0]);
    }
  }, {
    key: 'clearFilters',
    value: function clearFilters() {
      this.cachedOpts.forEach(function (o) {
        return o.style.display = '';
      });
      this.groups.forEach(function (g) {
        return g.element.style.display = '';
      });
      // show all opts
      this.currentOpts = this.cachedOpts;
      return this;
    }
  }, {
    key: 'filter',
    value: function filter(suppress, value) {
      var _this7 = this;

      if (!value) {
        value = this.config.selectOnly ? this.input.innerText : this.input.value;
      }
      var filter = this.config.filter;
      var befores = this.currentOpts;
      this.currentOpts = typeof filter === 'function' ? filter(value.trim(), this.cachedOpts) : _filters2.default[filter](value.trim(), this.cachedOpts);
      // don't let user's functions break stuff
      this.currentOpts = this.currentOpts || [];
      this.updateOpts();
      // announce count only if it has changed
      if (!befores.every(function (b) {
        return _this7.currentOpts.indexOf(b) > -1;
      }) && !suppress) {
        this.announceCount();
      }

      return this;
    }
  }, {
    key: 'announceCount',
    value: function announceCount() {
      var count = this.config.announcement && this.config.announcement.count;

      if (count && this.liveRegion) {
        this.liveRegion.announce(count(this.currentOpts.length), 500);
      }

      return this;
    }
  }, {
    key: 'updateOpts',
    value: function updateOpts() {
      var _this8 = this;

      var optVal = this.config.optionValue;
      this.cachedOpts.forEach(function (opt) {
        // configure display of options based on filtering
        opt.style.display = _this8.currentOpts.indexOf(opt) === -1 ? 'none' : '';
        // configure the innerHTML of each option
        opt.innerHTML = typeof optVal === 'string' ? (0, _wrapMatch2.default)(opt, _this8.input.tagName.toLowerCase() === 'div' ? _this8.getSearchString() : _this8.input.value, optVal) : optVal(opt);
      });

      this.updateGroups();
      return this;
    }
  }, {
    key: 'updateGroups',
    value: function updateGroups() {
      this.groups.forEach(function (groupData) {
        var visibleOpts = groupData.options.filter(function (opt) {
          return opt.style.display === '';
        });
        groupData.element.style.display = visibleOpts.length ? '' : 'none';
      });
      return this;
    }
  }, {
    key: 'select',
    value: function select() {
      var _this9 = this;

      var currentOpt = this.currentOption;
      if (!currentOpt) {
        return;
      }

      if (!this.config.multiselect && this.selected.length) {
        // clean up previously selected
        (0, _classlist2.default)(this.selected[0]).remove(this.config.selectedClass);
      }

      var idx = this.selected.indexOf(currentOpt);
      var wasSelected = idx > -1;

      // Multiselect option
      if (this.config.multiselect) {
        // If option is in array and gets clicked, remove it
        if (wasSelected) {
          this.selected.splice(idx, 1);
        } else {
          this.selected.push(currentOpt);
        }
      } else {
        this.selected = this.config.allowEmpty && wasSelected && !this.config.selectOnly ? [] : [currentOpt];
      }

      // manage aria-selected
      this.cachedOpts.forEach(function (o) {
        o.setAttribute('aria-selected', _this9.selected.indexOf(o) > -1 ? 'true' : 'false');
      });

      var value = this.selected.length ? this.config.selectionValue(this.selected) : '';

      if (wasSelected) {
        currentOpt.classList.remove(this.config.selectedClass);
        this.emit('deselection', { value: currentOpt.dataset.value, text: value, option: currentOpt });
      } else {
        currentOpt.classList.add(this.config.selectedClass);
        this.emit('selection', { value: currentOpt.dataset.value, text: value, option: currentOpt });
      }

      this.freshSelection = true;

      if (this.config.selectOnly) {
        this.input.innerText = value;
        // Set the value on the hidden <input> element
        if (this.config.inputElm) {
          this.config.inputElm.value = value;
        }
      } else {
        this.input.value = value;
      }

      this.cachedInputValue = value;
      this.filter(true).clearFilters();

      // close the list for single select
      // (leave it open for multiselect)
      if (!this.config.multiselect) {
        this.closeList();
        if (!this.config.selectOnly) {
          this.input.select();
        }
      }

      if (this.selectElm) {
        var values = this.value();
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.selectElm.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var option = _step2.value;

            if (this.config.multiselect) {
              option.selected = values.indexOf(option.value) !== -1;
            } else {
              option.selected = option.value === values;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return this;
    }
  }, {
    key: 'reset',
    value: function reset() {
      var _this10 = this;

      this.clearFilters();
      if (this.input.tagName && this.input.tagName.toLowerCase() === 'input') {
        this.input.value = '';
      } else {
        this.input.innerText = '';
      }
      this.updateOpts();
      this.input.removeAttribute('aria-activedescendant');
      this.input.removeAttribute('data-active-option');
      this.currentOption = null;
      this.selected = [];
      this.cachedOpts.forEach(function (optEl) {
        (0, _classlist2.default)(optEl).remove(_this10.config.selectedClass);
        (0, _classlist2.default)(optEl).remove(_this10.config.activeClass);
        optEl.setAttribute('aria-selected', 'false');
      });
      this.searchString = '';
      return this;
    }
  }, {
    key: 'goTo',
    value: function goTo(option, fromKey) {
      var _this11 = this;

      if (typeof option === 'string') {
        // 'prev' or 'next'
        var optIndex = this.getOptIndex();
        return this.goTo(option === 'next' ? optIndex + 1 : optIndex - 1, fromKey);
      }

      var newOpt = this.currentOpts[option];
      var groupChange = false;

      if (!this.currentOpts[option]) {
        // end of the line so allow scroll up for visibility of potential group labels
        if (this.getOptIndex() === 0) {
          this.list.scrollTop = 0;
        }
        return this;
      } else if (this.groups.length) {
        var newGroup = (0, _currentGroup2.default)(this.groups, newOpt);
        groupChange = newGroup && newGroup !== this.currentGroup;
        this.currentGroup = newGroup;
      }

      // update current option
      this.currentOption = newOpt;
      // show pseudo focus styles
      this.pseudoFocus(groupChange);
      // Detecting if element is inView and scroll to it.
      this.currentOpts.filter(Boolean).forEach(function (opt) {
        if (opt.classList.contains(_this11.config.activeClass) && !(0, _isScrolledInView2.default)(_this11.list, opt)) {
          (0, _scrolltoElement2.default)(opt);
        }
      });

      return this;
    }
  }, {
    key: 'pseudoFocus',
    value: function pseudoFocus(groupChanged) {
      var option = this.currentOption;
      var activeClass = this.config.activeClass;
      var prevId = this.input.getAttribute('data-active-option');
      var prev = prevId && document.getElementById(prevId);

      // clean up
      if (prev && activeClass) {
        (0, _classlist2.default)(prev).remove(activeClass);
      }

      if (option) {
        this.input.setAttribute('data-active-option', option.id);
        if (activeClass) {
          (0, _classlist2.default)(option).add(activeClass);
        }

        if (this.liveRegion) {
          (0, _announceActive2.default)(option, this.config, this.liveRegion.announce.bind(this.liveRegion), groupChanged, this.currentGroup && this.currentGroup.element);
        }

        this.input.setAttribute('aria-activedescendant', option.id);
        this.currentOption = option;
        this.emit('change');
      }
      return this;
    }
  }, {
    key: 'setOptions',
    value: function setOptions(option) {
      // The below code adds the  new option to current Dropdown list
      if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
        // This needs to be check for passing unit test
        this.config.list.append(option);
      }
      this.cachedOpts.push(option);
      if (this.currentOpts.indexOf(option) === -1) {
        this.currentOpts.push(option);
      }
      return this;
    }

    /**
     * Clear all options from the Combobo. This will remove all options from the Combobo and
     * reset the Combobo to its initial state.
     * 
     * @param {Object} args
     * @param {String} [args.placeholder] The placeholder text to be added back to the Combobo.
     * @param {Boolean} [args.usePlaceholder] If true, the placeholder option that's added back will be selected.
     */

  }, {
    key: 'clearOptions',
    value: function clearOptions() {
      var _this12 = this;

      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      args = (0, _extendShallow2.default)({ usePlaceholder: true }, args);

      this.emptyDropdownList().reset();

      if (this.list) {
        var listChildNodes = Array.from(this.list.childNodes);

        listChildNodes.forEach(function (child) {
          _this12.list.removeChild(child);
        });
      }

      if (this.selectElm) {
        var selectChildNodes = Array.from(this.selectElm.childNodes);

        selectChildNodes.forEach(function (child) {
          _this12.selectElm.removeChild(child);
        });
      }

      this.currentOpts = [];
      this.cachedOpts = [];
      this.groups = [];

      if ((this.config.placeholderText || args.placeholder) && args.usePlaceholder) {
        this.addPlaceholder({ label: this.config.placeholderText || args.placeholder });
      }

      return this;
    }

    /**
     * Adds a placeholder option to the Combobo. This option will be the first option in the Combobo and will be disabled.
     * 
     * @param {Option} args
     */

  }, {
    key: 'addPlaceholder',
    value: function addPlaceholder() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var placeholder = (0, _extendShallow2.default)({ label: this.config.placeholderText, value: '', disabled: true, selected: true }, args);
      if (placeholder.label) {
        this.addOption(placeholder, 'top');
      }

      return this;
    }

    /**
     * Add multiple options to the Combobo
     * The options provided can be either an array of objects representing individual options
     * or an array of objects representing optgroups and their options.
     *
     * @example
     * combobo.addOptions( [
     *  { label: 'Option 1', value: 'option1', selected: true, disabled: true },
     *  { label: 'Option 2', value: 'option2', selected: false },
     * ] );
     *
     * combobo.addOptions( [
     *  {
     *    label: 'Group 1', options: [
     *     { label: 'Option 1', value: 'option1', selected: true },
     *     { label: 'Option 2', value: 'option2', selected: false },
     *    ],
     *  },
     * ] );
     *
     * @param {OptGroup[]|Option[]} options The options to be added to the combobo
     */

  }, {
    key: 'addOptions',
    value: function addOptions(options) {
      var _this13 = this;

      if (Array.isArray(options) && options.length > 0) {
        options.forEach(function (option) {
          if (option.label && option.options) {
            _this13.addOptGroup(option);
          } else {
            _this13.addOption(option);
          }
        });
      }
      return this;
    }

    /**
     * Add an optgroup to the Combobo
     *
     * @typedef {Object} OptGroup
     * @property {String} label The label of the optgroup
     * @property {Option[]} options The options of the optgroup
     * 
     * @param {OptGroup} optGroup The optgroup to be added to the Combobo
     */

  }, {
    key: 'addOptGroup',
    value: function addOptGroup() {
      var _this14 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          label = _ref.label,
          options = _ref.options;

      if (this.selectElm) {
        var group = document.createElement('optgroup');
        group.label = label;

        options.forEach(function (opt) {
          var option = document.createElement('option');
          option.value = opt.value;
          option.selected = opt.selected;
          option.disabled = opt.disabled;
          option.innerHTML = opt.label;
          group.appendChild(option);
        });

        this.selectElm.append(group);
      }

      var optgroupElm = this.createOptgroupElement(label);

      var optionElms = [];

      options.forEach(function (opt) {
        var optionElm = _this14.createOptionElement(opt.label, opt.value, opt.selected, opt.disabled);
        optgroupElm.appendChild(optionElm);
        optionElms.push(optionElm);
        _this14.cachedOpts.push(optionElm);
        _this14.currentOpts.push(optionElm);
      });

      this.list.append(optgroupElm);

      this.groups.push({
        label: label,
        element: optgroupElm,
        options: optionElms
      });
    }

    /**
     * Add a new option to the Combobo
     *
     * @typedef {Object} Option
     * @property {String} label The text label of the option
     * @property {String} value The value of the option
     * @property {Boolean} [selected] Whether the option is selected
     * @property {Boolean} [disabled] Whether the option is disabled
     * @property {String} [className] The original class of the option
     *
     * @param {Option} option The option to be added to the Combobo
     * @param {'top'|'bottom'} placement The placement of the option in the Combobo
     */

  }, {
    key: 'addOption',
    value: function addOption() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          label = _ref2.label,
          value = _ref2.value,
          selected = _ref2.selected,
          disabled = _ref2.disabled,
          className = _ref2.className;

      var placement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bottom';

      if (label) {
        if (this.selectElm) {
          var option = document.createElement('option');
          option.value = value;
          option.selected = selected;
          option.disabled = disabled;
          option.innerHTML = label;
          this.selectElm.append(option);
        }

        var optionElm = this.createOptionElement(label, value, selected, disabled, className);

        if (placement === 'top') {
          this.list.prepend(optionElm);
          this.cachedOpts.unshift(optionElm);
          this.currentOpts.unshift(optionElm);
        } else {
          this.list.append(optionElm);
          this.cachedOpts.push(optionElm);
          this.currentOpts.push(optionElm);
        }

        this.addEventsToOptionEl(optionElm);

        if (selected) {
          this.goTo(this.currentOpts.indexOf(optionElm), true).select();
        }
      }
      return this;
    }
  }, {
    key: 'setCurrentOptions',
    value: function setCurrentOptions() {
      this.currentOption = this.currentOpts[0]; // Sets the current option index
      return this;
    }
  }, {
    key: 'updateSelectedOptions',
    value: function updateSelectedOptions() {
      var _this15 = this;

      var list = document.getElementById(this.config.list.id);
      var selectedList = this.selected;
      this.emptyDropdownList();

      // The below code will remove all child elements in the dropdown list
      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }
      // The below code will append the selected options to the dropdown list if any
      if (selectedList.length > 0) {
        selectedList.forEach(function (item) {
          _this15.setOptions(item);
        });
      }
      return this;
    }
  }, {
    key: 'emptyDropdownList',
    value: function emptyDropdownList() {
      // empty the cachedOpts and currentOpts of dropdown list
      this.currentOpts = [];
      this.cachedOpts = [];
      this.optionsWithEventHandlers.clear();
      return this;
    }
  }, {
    key: 'setNoResultFound',
    value: function setNoResultFound() {
      // handle empty results whenever user perform search and if no relevant records found 
      (0, _noResults2.default)(this.list, this.currentOpts, this.config.noResultsText);
    }
  }, {
    key: 'value',
    value: function value() {
      var selected = [];

      this.selected.forEach(function (selectedElm) {
        if (selectedElm.hasAttribute('data-value')) {
          selected.push(selectedElm.dataset.value);
        } else {
          selected.push(selectedElm.innerText);
        }
      });

      if (!this.config.multiselect) {
        return selected && selected.length ? selected[0] : null;
      }

      return selected;
    }

    /**
     * Disables the Combobo by blocking all user interactions with the Combobo.
     *
     * Some elements will be "disabled" manually as the `disabled` attribute cannot be
     * applied to non-form/button elements (e.g. select-only `<div>` elements).
     *
     * @returns {Combobo}
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.disabled = true;

      this.input.setAttribute(this.input.tagName.toLowerCase() === 'input' ? 'disabled' : 'aria-disabled', 'true');
      this.input.removeAttribute('tabindex');

      if (this.toggleButton) {
        this.toggleButton.setAttribute('aria-disabled', 'true');
      }

      if (this.selectElm) {
        this.selectElm.setAttribute('disabled', 'disabled');
      }

      this.input.parentElement.setAttribute('aria-disabled', 'true');
      this.input.parentElement.classList.add('disabled');

      return this;
    }

    /**
     * Enables the Combobo by restoring all user interactions with the Combobo.
     *
     * @returns {Combobo}
     */

  }, {
    key: 'enable',
    value: function enable() {
      this.disabled = false;

      this.input.removeAttribute('disabled');
      this.input.removeAttribute('aria-disabled');
      this.input.setAttribute('tabindex', '0');

      if (this.toggleButton) {
        this.toggleButton.removeAttribute('aria-disabled');
      }

      if (this.selectElm) {
        this.selectElm.removeAttribute('disabled');
      }

      this.input.parentElement.removeAttribute('aria-disabled');
      this.input.parentElement.classList.remove('disabled');

      this.initEvents();

      return this;
    }

    /**
     * Transform a <select> element into a Combobo.
     *
     * @param {HTMLSelectElement} selectElement
     * @returns {Object}
     */

  }, {
    key: 'transformSelectElement',
    value: function transformSelectElement(selectElement) {
      var _this16 = this;

      // Get the class name on the original element
      var origClass = selectElement.className;

      // Create the wrapping div element
      var comboElement = document.createElement('div');
      comboElement.className = [this.config.wrapClass, origClass].filter(Boolean).join(' ');
      comboElement.id = selectElement.id + '-combobo';
      if (selectElement.hasAttribute('placeholder')) {
        this.config.placeholderText = selectElement.getAttribute('placeholder');
      }

      if (selectElement.multiple) {
        comboElement.classList.add('multiselect');
      }

      // Create the input element
      var inputEl = this.config.selectOnly ? 'div' : 'input';
      var input = document.createElement(inputEl);
      input.setAttribute('tabindex', '0');
      input.type = 'text';
      input.className = this.config.inputClass;
      input.id = selectElement.id + '-input';
      comboElement.appendChild(input);

      // Create the toggle button
      var toggleButton = document.createElement('span');
      toggleButton.setAttribute('aria-hidden', 'true');
      toggleButton.className = this.config.toggleButtonClass;
      comboElement.appendChild(toggleButton);

      // Create the listbox
      var listbox = document.createElement('div');
      listbox.className = this.config.listClass;
      comboElement.appendChild(listbox);

      var hasOptgroup = false;
      // Process groups and options
      Array.from(selectElement.children).forEach(function (child) {
        var origOptgroup = child.tagName.toLowerCase() === 'optgroup';
        if (origOptgroup) {
          hasOptgroup = true;
          var origOptgroupClass = child.className;
          var optgroup = _this16.createOptgroupElement(child.label, origOptgroupClass);

          Array.from(child.children).forEach(function (option) {
            var data = {
              text: option.textContent,
              value: option.value,
              selected: option.hasAttribute('selected'),
              disabled: option.hasAttribute('disabled'),
              origClass: option.className
            };
            optgroup.appendChild(_this16.createOptionElement(data.text, data.value, data.selected, data.disabled, data.origClass));
          });

          listbox.appendChild(optgroup);
        } else {
          // In case there are direct options without a group
          var data = {
            text: child.textContent,
            value: child.value,
            selected: child.hasAttribute('selected'),
            disabled: child.hasAttribute('disabled')
          };
          listbox.appendChild(_this16.createOptionElement(data.text, data.value, data.selected, data.disabled, data.origClass));
        }
      });

      if (this.config.placeholderText) {
        this.addPlaceholder();
      }

      if (hasOptgroup) {
        comboElement.classList.add('has-groups');
      }

      // Rewrite the label's `for` attribute to match the new input's ID (necessary because the
      // <select> element gets hidden).
      this.reassignLabel(selectElement, input);

      return { comboElement: comboElement, input: input };
    }

    /**
     * Returns a new option element for the listbox.
     * 
     * @param {string} text The label/text of the option
     * @param {string} value The value of the option
     * @param {boolean} selected If the option is selected
     * @param {boolean} disabled If the option is disabled
     * @param {string} [origClass] The original class of the option
     *
     * @returns {HTMLDivElement}
     */

  }, {
    key: 'createOptionElement',
    value: function createOptionElement(text, value, selected, disabled) {
      var origClass = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

      var optId = (0, _rndid2.default)();
      var opt = document.createElement('div');

      opt.className = [this.config.optionsClass, origClass].filter(Boolean).join(' ');
      opt.innerHTML = text;
      opt.dataset.value = value;
      opt.id = optId;

      opt.setAttribute('role', 'option');
      opt.setAttribute('aria-selected', selected ? 'true' : 'false');

      if (selected) {
        opt.classList.add(this.config.selectedClass);
      }

      if (disabled) {
        opt.classList.add('disabled');
      }

      return opt;
    }

    /**
     * Returns a new optgroup element for the listbox.
     * 
     * @param {string} text The label/text of the optgroup
     * @param {string} origClass The original class of the optgroup
     * 
     * @returns {HTMLDivElement}
     */

  }, {
    key: 'createOptgroupElement',
    value: function createOptgroupElement(text) {
      var origClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var groupId = (0, _rndid2.default)();
      var optgroup = document.createElement('div');
      optgroup.className = [this.config.optgroupClass, origClass].filter(Boolean).join(' ');
      optgroup.setAttribute('role', 'group');
      optgroup.setAttribute('aria-labelledby', groupId);

      var label = document.createElement('div');
      label.className = this.config.optgroupLabelClass;
      label.id = groupId;
      label.innerHTML = text;

      optgroup.append(label);

      return optgroup;
    }
  }]);

  return Combobo;
}();

/**
 * NOTE:
 * - https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/#combobox
 *    - "For each combobox pattern the button need not be in the tab order if there
 *    is an appropriate keystroke associated with the input element such that when
 *    focus is on the input, the keystroke triggers display of the associated drop
 *    down list."
 */

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates the region
 * @param {Object} options The following configuration options:
 * @option {String} `ariaLive`: "polite" or "assertive" (defaults to "polite")
 * @option {String} `role`: "status", "alert", or "log" (defaults to "log")
 * @option {String} `ariaRelevant`: "additions", "removals", "text", "all",
 *         or "additions text" (defaults to "additions")
 * @option {String} `ariaAtomic`: "true" or "false" (defaults to "false")
 */

function LiveRegion(options) {
  this.region = document.createElement('div');
  this.options = options || {};
  // set attrs / styles
  this.configure();
  // append it
  document.body.appendChild(this.region);
}

/**
 * configure
 * Sets attributes and offscreens the region
 */

LiveRegion.prototype.configure = function () {
  var opts = this.options;
  var region = this.region;
  // set attributes
  region.setAttribute('aria-live', opts.ariaLive || 'polite');
  region.setAttribute('role', opts.role || 'log');
  region.setAttribute('aria-relevant', opts.ariaRelevant || 'additions');
  region.setAttribute('aria-atomic', opts.ariaAtomic || 'false');

  // offscreen it
  this.region.style.position = 'absolute';
  this.region.style.width = '1px';
  this.region.style.height = '1px';
  this.region.style.marginTop = '-1px';
  this.region.style.clip = 'rect(1px, 1px, 1px, 1px)';
  this.region.style.overflow = 'hidden';
};

/**
 * announce
 * Creates a live region announcement
 * @param {String} msg The message to announce
 * @param {Number} `expire`: The number of ms before removing the announcement
 * node from the live region. This prevents the region from getting full useless
 * nodes (defaults to 7000)
 */

LiveRegion.prototype.announce = function (msg, expire) {
  var announcement = document.createElement('div');
  announcement.innerHTML = msg;
  // add it to the offscreen region
  this.region.appendChild(announcement);

  if (expire || typeof expire === 'undefined') {
    setTimeout(function () {
      this.region.removeChild(announcement);
    }.bind(this), expire || 7e3); // defaults to 7 seconds
  }
};

/**
 * destroy
 * Removes the live region DOM node inserted on initialization
 */

LiveRegion.prototype.destroy = function () {
  this.region.parentNode.removeChild(this.region)
};

/**
 * Expose LiveRegion
 */

if (true) {
  module.exports = LiveRegion;
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.scrolltoElement=t():e.scrolltoElement=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(){}function u(e){function t(e){null===h&&(h=e);var r=e-h,o=u(r/n)*w;l.scrollTop=Math.round(d+o),r<n?(0,a.default)(t):c()}var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=0,u=void 0,c=void 0;if((0,s.isElement)(e))u=f.default.apply(void 0,m),c=i;else{if(!(0,s.isObject)(e))throw new TypeError("The first argument must be HTMLElement or Object.");if(!(0,s.isElement)(e.element))throw new TypeError("`element` must be HTMLElement.");r=(0,s.isNumeric)(e.offset)?e.offset:0,u=(0,s.isArray)(e.bezier)&&4===e.bezier.length?f.default.apply(void 0,o(e.bezier)):f.default.apply(void 0,m),n=e.duration,c=(0,s.isFunction)(e.then)?e.then:i,e=e.element}(!(0,s.isNumeric)(n)||n<0)&&(n=100);var l=(0,p.default)(e),d=l.scrollTop,y=l.offsetTop,h=null,v=void 0;v="BODY"===l.nodeName?e.getBoundingClientRect().top+(window.scrollY||window.pageYOffset||document.body.scrollTop)-y:e.offsetTop-y;var w=v-d+r;(0,a.default)(t)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(4),f=r(c),l=n(7),a=r(l),s=n(2),d=n(3),p=r(d),m=[.19,1,.22,1];t.default=u},function(e,t,n){"use strict";var r=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(r);e.exports=o.default},function(e,t,n){"use strict";function r(e){return Object.prototype.toString.call(e)}function o(e){return"[object Object]"===r(e)}function i(e){return null!=e&&"[object Array]"===r(e)}function u(e){return!isNaN(parseFloat(e))&&isFinite(e)}function c(e){return u(e)&&e>=0}function f(e){return null!=e&&"[object Function]"===r(e)}function l(e){return"object"===a(window.HTMLElement)?e instanceof window.HTMLElement:!!e&&"object"===(void 0===e?"undefined":a(e))&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.isObject=o,t.isArray=i,t.isNumeric=u,t.isPositive=c,t.isFunction=f,t.isElement=l},function(e,t,n){"use strict";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=e.parentNode;return null===n||"HTML"===n.nodeName?t:r(n,t.concat(n))}function o(e,t){return window.getComputedStyle(e,null).getPropertyValue(t)}function i(e){return o(e,"overflow")+o(e,"overflow-y")}function u(e){if(1===e.nodeType)return f.test(i(e))&&e.scrollHeight>e.clientHeight}function c(e){for(var t=r(e),n=document.body,o=0,i=t.length;o<i;o++)if(u(t[o])){n=t[o];break}return n}Object.defineProperty(t,"__esModule",{value:!0});var f=/(auto|scroll)/;t.default=c},function(e,t){function n(e,t){return 1-3*t+3*e}function r(e,t){return 3*t-6*e}function o(e){return 3*e}function i(e,t,i){return((n(t,i)*e+r(t,i))*e+o(t))*e}function u(e,t,i){return 3*n(t,i)*e*e+2*r(t,i)*e+o(t)}function c(e,t,n,r,o){var u,c,f=0;do{c=t+(n-t)/2,u=i(c,r,o)-e,u>0?n=c:t=c}while(Math.abs(u)>a&&++f<s);return c}function f(e,t,n,r){for(var o=0;o<l;++o){var c=u(t,n,r);if(0===c)return t;t-=(i(t,n,r)-e)/c}return t}var l=4,a=1e-7,s=10,d=11,p=1/(d-1),m="function"==typeof Float32Array;e.exports=function(e,t,n,r){function o(t){for(var r=0,o=1,i=d-1;o!==i&&l[o]<=t;++o)r+=p;--o;var a=(t-l[o])/(l[o+1]-l[o]),s=r+a*p,m=u(s,e,n);return m>=.001?f(t,s,e,n):0===m?s:c(t,r,r+p,e,n)}if(!(0<=e&&e<=1&&0<=n&&n<=1))throw new Error("bezier x values must be in [0, 1] range");var l=m?new Float32Array(d):new Array(d);if(e!==t||n!==r)for(var a=0;a<d;++a)l[a]=i(a*p,e,n);return function(u){return e===t&&n===r?u:0===u?0:1===u?1:i(o(u),t,r)}}},function(e,t,n){(function(t){(function(){var n,r,o,i,u,c;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:void 0!==t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-u)/1e6},r=t.hrtime,n=function(){var e;return e=r(),1e9*e[0]+e[1]},i=n(),c=1e9*t.uptime(),u=i-c):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(t,n(6))},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(a===setTimeout)return setTimeout(e,0);if((a===n||!a)&&setTimeout)return a=setTimeout,setTimeout(e,0);try{return a(e,0)}catch(t){try{return a.call(null,e,0)}catch(t){return a.call(this,e,0)}}}function i(e){if(s===clearTimeout)return clearTimeout(e);if((s===r||!s)&&clearTimeout)return s=clearTimeout,clearTimeout(e);try{return s(e)}catch(t){try{return s.call(null,e)}catch(t){return s.call(this,e)}}}function u(){y&&p&&(y=!1,p.length?m=p.concat(m):h=-1,m.length&&c())}function c(){if(!y){var e=o(u);y=!0;for(var t=m.length;t;){for(p=m,m=[];++h<t;)p&&p[h].run();h=-1,t=m.length}p=null,y=!1,i(e)}}function f(e,t){this.fun=e,this.array=t}function l(){}var a,s,d=e.exports={};!function(){try{a="function"==typeof setTimeout?setTimeout:n}catch(e){a=n}try{s="function"==typeof clearTimeout?clearTimeout:r}catch(e){s=r}}();var p,m=[],y=!1,h=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new f(e,t)),1!==m.length||y||o(c)},f.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,t,n){(function(t){for(var r=n(5),o="undefined"==typeof window?t:window,i=["moz","webkit"],u="AnimationFrame",c=o["request"+u],f=o["cancel"+u]||o["cancelRequest"+u],l=0;!c&&l<i.length;l++)c=o[i[l]+"Request"+u],f=o[i[l]+"Cancel"+u]||o[i[l]+"CancelRequest"+u];if(!c||!f){var a=0,s=0,d=[];c=function(e){if(0===d.length){var t=r(),n=Math.max(0,1e3/60-(t-a));a=n+t,setTimeout(function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(a)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return d.push({handle:++s,callback:e,cancelled:!1}),s},f=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0)}}e.exports=function(e){return c.call(o,e)},e.exports.cancel=function(){f.apply(o,arguments)},e.exports.polyfill=function(){o.requestAnimationFrame=c,o.cancelAnimationFrame=f}}).call(t,n(8))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n}])});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if an option is COMPLETELY visible in a list
 * @param  {HTMLElement} list The scrollable list element
 * @param  {HTMLElement} opt  The option in question
 * @return {Boolean}
 */

module.exports = function (list, opt) {
  var listHeight = list.clientHeight;
  var optHeight = opt.clientHeight;
  var scrollTop = list.scrollTop;
  var offsetTop = opt.offsetTop;
  var isAbove = scrollTop > offsetTop;
  var isBelow = scrollTop + listHeight - optHeight < offsetTop;

  return !isAbove && !isBelow;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if `target` is completely in viewport and returns an object containing:
 * - {Boolean} visible   if the target is visible
 * - {String}  position  the position the element is offscreen ('top' or 'bottom')
 *
 * @param  {HTMLElement} target the element in question
 * @return {Object}
 */

module.exports = function (target) {
  var windowHeight = window.innerHeight;
  var rect = target.getBoundingClientRect();
  var isOffTop = rect.top < 0;
  var isOffBottom = rect.bottom > windowHeight;
  var isVisible = !isOffTop && !isOffBottom;
  var data = {
    visible: isVisible
  };

  if (!isVisible) {
    data.position = isOffTop ? 'top' : 'bottom';
  }

  return data;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _value = __webpack_require__(12);

var _value2 = _interopRequireDefault(_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  'contains': function contains(text, opts) {
    return opts.filter(function (o) {
      return (0, _value2.default)(o).toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
  },
  'equals': function equals(text, opts) {
    return opts.filter(function (o) {
      return (0, _value2.default)(o).toLowerCase() === text.toLowerCase();
    });
  },
  'starts-with': function startsWith(text, opts) {
    return opts.filter(function (o) {
      return (0, _value2.default)(o).toLowerCase().indexOf(text.toLowerCase()) === 0;
    });
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (el) {
  return el.getAttribute('data-value') || el.innerText;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keymap = __webpack_require__(14);

var _keymap2 = _interopRequireDefault(_keymap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * attach
 * @param  {String} eventType the type of keyboard event to be attached
 * @param  {HTMLElement} target    the desired target
 * @param  {Object} config    An array of keys / callbacks
 */
exports.attach = function (eventType, target, config) {
  if (typeof config === 'function') {
    return target.addEventListener(eventType, config);
  }
  if (!config || !config.length) {
    return;
  }
  target.addEventListener(eventType, function (e) {
    var keyName = _keymap2.default[e.which];

    config.forEach(function (c) {
      if (c.keys.indexOf(keyName) > -1) {
        if (c.preventDefault) {
          e.preventDefault();
        }
        c.callback(e, keyName);
      }
    });
  });
};

/**
 * Example usage:
 * const keyboard = require('keyvent');
 * keyboard.up(element, [
 *   {
 *     keys: ['space', 'enter'],
 *     callback: funk
 *   }
 * ]);
 */

exports.up = function (el, config) {
  return exports.attach('keyup', el, config);
};
exports.down = function (el, config) {
  return exports.attach('keydown', el, config);
};
exports.press = function (el, config) {
  return exports.attach('keypress', el, config);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  27: 'escape',
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (target, els, checkSelf) {
  els = !els.length ? [els] : els;

  if (checkSelf && els.indexOf(target) > -1) {
    return true;
  }
  var parent = target.parentNode;
  // walk
  while (parent && parent.tagName !== 'HTML') {
    if (els.indexOf(parent) > -1) {
      return true;
    }
    parent = parent.parentNode;
  }

  return false;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _select = __webpack_require__(17);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (l, all, context) {
  context = context || document;
  if (typeof l === 'string') {
    return all ? _select2.default.all(l, context) : (0, _select2.default)(l, context);
  }

  return l;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = function (selector, context) {
  context = context || document;
  return context.querySelector(selector);
};

exports.all = function (selector, context) {
  context = context || document;
  return Array.prototype.slice.call(context.querySelectorAll(selector));
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (groups, option) {
  var matches = groups.filter(function (g) {
    return g.options.indexOf(option) > -1;
  });
  return matches.length && matches[0];
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classlist = __webpack_require__(0);

var _classlist2 = _interopRequireDefault(_classlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (list, currentOpts, noResultsText) {
  var noResults = list.querySelector('.combobo-no-results');

  if (noResultsText && !currentOpts.length && !noResults) {
    noResults = document.createElement('div');
    (0, _classlist2.default)(noResults).add('combobo-no-results');
    noResults.innerHTML = noResultsText;
    list.appendChild(noResults);
  } else if (noResults && currentOpts.length) {
    list.removeChild(noResults);
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rndid = __webpack_require__(1);

var _rndid2 = _interopRequireDefault(_rndid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sets attributes on input / list / options
 */
module.exports = function (input, list, options) {
  list.id = list.id || (0, _rndid2.default)();

  input.setAttribute('role', 'combobox');
  list.setAttribute('role', 'listbox');
  input.setAttribute('aria-controls', list.id);
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');

  options.forEach(function (opt) {
    opt.setAttribute('role', 'option');
    opt.id = opt.id || (0, _rndid2.default)();
  });
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Wraps any matches (between input value on option) in a span with the accent class
 * @param  {HTMLElement} optionEl    The option element
 * @param  {HTMLElement} input       The input element
 * @param  {String} accentClass      The class to be added to the match span
 * @return {String}                  The result html string
 */

module.exports = function (optionEl, inputText, accentClass) {
  inputText = inputText || '';
  var optionText = optionEl.innerText;
  var matchStart = optionText.toLowerCase().indexOf(inputText.toLowerCase());
  var matchLength = inputText.length;

  if (inputText && matchStart >= 0) {
    var before = optionText.substring(0, matchStart);
    var matchText = optionText.substr(matchStart, matchLength);
    var after = optionText.substring(matchStart + matchLength);
    return before + '<span class="' + accentClass + '">' + matchText + '</span>' + after;
  }

  return optionText;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extendShallow = __webpack_require__(2);

var _extendShallow2 = _interopRequireDefault(_extendShallow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} ComboboConfig
 * @property {string} [select] The selector for the <select> element
 * @property {string} [input] The selector for the <input> element
 * @property {string} [list] The selector for the <ul> element
 * @property {string} [toggleButton] The selector for the toggle button
 * @property {string} [options] The selector for the options within the list
 * @property {string} [groups] The selector for the groups within the list
 * @property {string} [wrapClass] The class name for the wrapper element
 * @property {string} [inputClass] The class name for the input element
 * @property {string} [listClass] The class name for the list element
 * @property {string} [toggleButtonClass] The class name for the toggle button
 * @property {string} [toggleButtonIcon] The icon for the toggle button
 * @property {string} [optgroupClass] The class name for the optgroup element
 * @property {string} [optgroupLabelClass] The class name for the optgroup label
 * @property {string} [optionsClass] The class name for the options
 * @property {string} [openClass] The class name for the open state
 * @property {string} [activeClass] The class name for the active (hover) state
 * @property {string} [selectedClass] The class name for the selected state
 * @property {boolean} [useLiveRegion] Whether or not to use a live region
 * @property {boolean} [allowEmpty] Whether or not to allow empty selections
 * @property {boolean} [multiselect] Whether or not to allow multiple selections
 * @property {string|null} [noResultsText] The text to display when no results are found
 * @property {string|null} [placeholderText] The text to display as a placeholder
 * @property {(selected: HTMLDivElement[]) => string} [selectionValue] The function to get the value of the selected options
 * @property {(option: HTMLDivElement) => string} [optionValue] The function to get the value of the option
 * @property {Object} [announcement] The announcement configuration
 * @property {(n: number) => string} [announcement.count] The function to get the count announcement
 * @property {string} [announcement.selected] The announcement for selected options
 * @property {'contains'|'starts-with'|'equals'|(option: string) => boolean} [filter] The filter type to use
 * @property {boolean} [autoFilter] Whether or not to enable auto filtering
 * @property {boolean} [selectOnly] Whether or not to only allow selections
 * @property {number} [selectSearchTimeout] The timeout for search selections in milliseconds; only relevant if `selectOnly` is `true`
 * @property {boolean} [disabled] Whether or not to disable the combobox
 */

/**
 * The default config for Combobo
 * @type {ComboboConfig}
 */
var defaults = {
  select: 'select.combobo',
  input: '.combobox',
  list: '.listbox',
  toggleButton: '.trigger',
  options: '.option', // qualified within `list`
  groups: null, // qualified within `list`
  wrapClass: 'combo-wrap',
  inputClass: 'combobox',
  listClass: 'listbox',
  toggleButtonClass: 'trigger',
  toggleButtonIcon: null,
  optgroupClass: 'optgroup',
  optgroupLabelClass: 'optgroup-label',
  optionsClass: 'option',
  openClass: 'open',
  activeClass: 'active',
  selectedClass: 'selected',
  useLiveRegion: true,
  allowEmpty: true,
  multiselect: false,
  noResultsText: null,
  placeholderText: null,
  selectionValue: function selectionValue(selecteds) {
    return selecteds.map(function (s) {
      return s.innerText.trim();
    }).join(' - ');
  },
  optionValue: function optionValue(option) {
    return option.innerHTML;
  },
  announcement: {
    count: function count(n) {
      return n + ' options available';
    },
    selected: 'Selected.'
  },
  filter: 'contains',
  autoFilter: true,
  selectOnly: false,
  selectSearchTimeout: 500,
  disabled: false
};

/**
 * Merges user's config with defaults
 * @param  {Object} userConfig
 * @return {Object}
 */
module.exports = function (userConfig) {
  var config = {};
  var announcementConfig = {};
  // setup for announcement
  userConfig.announcement = userConfig.announcement || {};
  // merge user's announcement object with the announcement defaults
  (0, _extendShallow2.default)(announcementConfig, defaults.announcement, userConfig.announcement);
  // merge the others...
  (0, _extendShallow2.default)(config, defaults, userConfig);
  config.announcement = announcementConfig;

  return config;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



module.exports = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Announces info about newly activated (NOT selected) option
 * @param  {HTMLElement} option   the newly active option
 * @param  {Object} config        Combobo configuration object
 * @param  {function} announce    the live region announce function
 * @param  {Boolean} groupChanged if activation entailed a group change (if applicable)
 */

module.exports = function (option, config, announce, groupChanged, element) {
  var isSelected = option.getAttribute('aria-selected') === 'true';
  var selectedText = config.announcement.selected;
  var msg = option.innerText; // TODO: make this more configurable

  // add text about newly entered group (if applicable)
  msg = groupChanged && config.announcement && config.announcement.groupChange ? config.announcement.groupChange(element) + ' ' + msg : msg;

  // convey selected state to AT that don't support aria-activedescendant (if applicable)
  msg = isSelected && selectedText ? msg + ' ' + selectedText : msg;

  // announce info to AT
  announce(msg, 500);
};

/***/ })
/******/ ]);
});