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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ClassList

var indexOf = __webpack_require__(3),
    trim = __webpack_require__(4),
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


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classlist = __webpack_require__(0);

var _classlist2 = _interopRequireDefault(_classlist);

var _componentEmitter = __webpack_require__(5);

var _componentEmitter2 = _interopRequireDefault(_componentEmitter);

var _liveRegion = __webpack_require__(6);

var _liveRegion2 = _interopRequireDefault(_liveRegion);

var _scrolltoElement = __webpack_require__(7);

var _scrolltoElement2 = _interopRequireDefault(_scrolltoElement);

var _isScrolledInView = __webpack_require__(8);

var _isScrolledInView2 = _interopRequireDefault(_isScrolledInView);

var _viewportStatus = __webpack_require__(9);

var _viewportStatus2 = _interopRequireDefault(_viewportStatus);

var _filters = __webpack_require__(10);

var _filters2 = _interopRequireDefault(_filters);

var _keyvent = __webpack_require__(12);

var _keyvent2 = _interopRequireDefault(_keyvent);

var _isWithin = __webpack_require__(14);

var _isWithin2 = _interopRequireDefault(_isWithin);

var _elementHandler = __webpack_require__(15);

var _elementHandler2 = _interopRequireDefault(_elementHandler);

var _currentGroup = __webpack_require__(17);

var _currentGroup2 = _interopRequireDefault(_currentGroup);

var _noResults = __webpack_require__(18);

var _noResults2 = _interopRequireDefault(_noResults);

var _attributes = __webpack_require__(19);

var _attributes2 = _interopRequireDefault(_attributes);

var _wrapMatch = __webpack_require__(20);

var _wrapMatch2 = _interopRequireDefault(_wrapMatch);

var _config = __webpack_require__(21);

var _config2 = _interopRequireDefault(_config);

var _announceActive = __webpack_require__(24);

var _announceActive2 = _interopRequireDefault(_announceActive);

var _rndid = __webpack_require__(1);

var _rndid2 = _interopRequireDefault(_rndid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  function Combobo(config) {
    var _this = this;

    _classCallCheck(this, Combobo);

    config = config || {};

    // merge user config with default config
    this.config = (0, _config2.default)(config);

    // initial state
    this.isOpen = false;
    this.currentOption = null;
    this.selectElm = null;
    this.selected = [];
    this.groups = [];
    this.isHovering = false;
    this.autoFilter = this.config.autoFilter;
    this.optionsWithEventHandlers = new Set();
    this.optionsWithKeyEventHandlers = new Set();

    if (!this.config.internalCall) {
      var combobos = {};
      var selectElements = (0, _elementHandler2.default)(this.config.select, true);
      var inputElements = (0, _elementHandler2.default)(this.config.input, true);
      if (inputElements && inputElements.length && !this.config.select.startsWith('#')) {
        inputElements.forEach(function (input) {
          var config = Object.assign({}, _this.config);
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
            optgroupElm.appendChild(optionElm); // Add option to optgroup
            _this.currentOpts.push(optionElm);
          });
          _this.list.appendChild(optgroupElm); // Add optgroup to the list
        } else {
          // If option is a standalone option
          var optionElm = _this.createOptionElement(option.text, option.value, option.selected, option.disabled);
          _this.list.appendChild(optionElm);
          _this.currentOpts.push(optionElm);
        }
      });

      this.cachedOpts = this.currentOpts;
    } else {
      this.cachedOpts = this.currentOpts = (0, _elementHandler2.default)(this.config.options, true, this.list);
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

  _createClass(Combobo, [{
    key: 'initEvents',
    value: function initEvents() {
      var _this2 = this;

      (0, _componentEmitter2.default)(this);
      if (!this.optionsWithKeyEventHandlers.has(this.input)) {
        this.input.addEventListener('click', function () {
          _this2.openList().goTo(_this2.getOptIndex() || 0); // ensure its open
        });

        this.input.addEventListener('blur', function () {
          if (!_this2.isHovering) {
            _this2.closeList();
          }
        });

        this.input.addEventListener('focus', function () {
          if (_this2.selected.length) {
            _this2.input.value = _this2.selected.length >= 2 ? '' : _this2.config.selectionValue(_this2.selected);
          }
          _this2.input.select();
        });

        if (this.toggleButton) {
          // handle trigger clicks to toggle state of the 
          this.toggleButton.addEventListener('click', function (e) {
            e.stopPropagation();
            if (_this2.isOpen) {
              _this2.closeList();
            } else {
              _this2.openList();
            }
          });
        }

        // listen for clicks outside of combobox
        document.addEventListener('click', function (e) {
          var isOrWithin = (0, _isWithin2.default)(e.target, [_this2.input, _this2.list], true);
          if (!isOrWithin && _this2.isOpen) {
            _this2.closeList();
          }
        });
      }

      this.optionEvents();
      this.initKeys();
    }
  }, {
    key: 'getOptIndex',
    value: function getOptIndex() {
      return this.currentOption && this.currentOpts.indexOf(this.currentOption);
    }
  }, {
    key: 'optionEvents',
    value: function optionEvents() {
      var _this3 = this;

      this.cachedOpts.forEach(function (option) {
        // The event should not be added again for already selected options and existing options
        if (!_this3.optionsWithEventHandlers.has(option.id) && !_this3.selected.includes(option)) {
          option.addEventListener('click', function () {
            _this3.goTo(_this3.currentOpts.indexOf(option)).select();
          });

          option.addEventListener('mouseover', function () {
            // clean up
            var prev = _this3.currentOption;
            if (prev) {
              (0, _classlist2.default)(prev).remove(_this3.config.activeClass);
            }
            (0, _classlist2.default)(option).add(_this3.config.activeClass);
            _this3.isHovering = true;
          });

          option.addEventListener('mouseout', function () {
            (0, _classlist2.default)(option).remove(_this3.config.activeClass);
            _this3.isHovering = false;
          });
          _this3.optionsWithEventHandlers.add(option.id);
        }
      });
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

      if (selectText) {
        this.input.select();
      }
      this.emit('list:close');
      return this;
    }
  }, {
    key: 'initKeys',
    value: function initKeys() {
      var _this4 = this;

      // keydown listener
      if (this.optionsWithKeyEventHandlers.has(this.input)) {
        return;
      } else {
        this.optionsWithKeyEventHandlers.add(this.input);
      }
      _keyvent2.default.down(this.input, [{
        keys: ['up', 'down'],
        callback: function callback(e, k) {
          if (_this4.isOpen) {
            // if typing filtered out the pseudo-current option
            if (_this4.currentOpts.indexOf(_this4.currentOption) === -1) {
              return _this4.goTo(0, true);
            }
            return _this4.goTo(k === 'down' ? 'next' : 'prev', true);
          }

          var idx = _this4.selected.length ? _this4.currentOpts.indexOf(_this4.selected[_this4.selected.length - 1]) : 0;

          _this4.goTo(idx, true).openList();
        },
        preventDefault: true
      }, {
        keys: ['enter'],
        callback: function callback(e) {
          if (_this4.isOpen) {
            e.preventDefault();
            e.stopPropagation();
            _this4.select();
          }
        }
      }, {
        keys: ['escape'],
        callback: function callback(e) {
          if (_this4.isOpen) {
            e.stopPropagation();
            _this4.closeList(true, true);
          }
        }
      }, {
        keys: ['backspace'],
        callback: function callback() {
          if (_this4.selected.length >= 2) {
            _this4.input.value = '';
          }
        }
      }]);

      // ignore tab, enter, escape and shift
      var ignores = [9, 13, 27, 16];
      // filter keyup listener
      _keyvent2.default.up(this.input, function (e) {
        // If autoFilter is false, key up filter not required
        if (!_this4.autoFilter) {
          return;
        }
        var filter = _this4.config.filter;
        var cachedVal = _this4.cachedInputValue;
        if (ignores.indexOf(e.which) > -1 || !filter) {
          return;
        }

        // Handles if there is a fresh selection
        if (_this4.freshSelection) {
          _this4.clearFilters();
          if (cachedVal && cachedVal.trim() !== _this4.input.value.trim()) {
            // if the value has changed...
            _this4.filter().openList();
            _this4.freshSelection = false;
          }
        } else {
          _this4.filter().openList();
        }

        // handle empty results
        (0, _noResults2.default)(_this4.list, _this4.currentOpts, _this4.config.noResultsText);
      });
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
    value: function filter(supress) {
      var _this5 = this;

      var filter = this.config.filter;
      var befores = this.currentOpts;
      this.currentOpts = typeof filter === 'function' ? filter(this.input.value.trim(), this.cachedOpts) : _filters2.default[filter](this.input.value.trim(), this.cachedOpts);
      // don't let user's functions break stuff
      this.currentOpts = this.currentOpts || [];
      this.updateOpts();
      // announce count only if it has changed
      if (!befores.every(function (b) {
        return _this5.currentOpts.indexOf(b) > -1;
      }) && !supress) {
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
      var _this6 = this;

      var optVal = this.config.optionValue;
      this.cachedOpts.forEach(function (opt) {
        // configure display of options based on filtering
        opt.style.display = _this6.currentOpts.indexOf(opt) === -1 ? 'none' : '';

        // configure the innerHTML of each option
        opt.innerHTML = typeof optVal === 'string' ? (0, _wrapMatch2.default)(opt, _this6.input, optVal) : optVal(opt);
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
      var _this7 = this;

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
        this.selected = this.config.allowEmpty && wasSelected ? [] : [currentOpt];
      }

      // manage aria-selected
      this.cachedOpts.forEach(function (o) {
        o.setAttribute('aria-selected', _this7.selected.indexOf(o) > -1 ? 'true' : 'false');
      });

      if (wasSelected) {
        currentOpt.classList.remove(this.config.selectedClass);
        this.emit('deselection', { text: this.input.value, option: currentOpt });
      } else {
        currentOpt.classList.add(this.config.selectedClass);
        this.emit('selection', { text: this.input.value, option: currentOpt });
      }

      this.freshSelection = true;
      this.input.value = this.selected.length ? this.config.selectionValue(this.selected) : '';
      this.cachedInputValue = this.input.value;
      this.filter(true).clearFilters();

      // close the list for single select
      // (leave it open for multiselect)
      if (!this.config.multiselect) {
        this.closeList();
        this.input.select();
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
      var _this8 = this;

      this.clearFilters();
      this.input.value = '';
      this.updateOpts();
      this.input.removeAttribute('aria-activedescendant');
      this.input.removeAttribute('data-active-option');
      this.currentOption = null;
      this.selected = [];
      this.cachedOpts.forEach(function (optEl) {
        (0, _classlist2.default)(optEl).remove(_this8.config.selectedClass);
        (0, _classlist2.default)(optEl).remove(_this8.config.activeClass);
        optEl.setAttribute('aria-selected', 'false');
      });
      return this;
    }
  }, {
    key: 'goTo',
    value: function goTo(option, fromKey) {
      var _this9 = this;

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
      // Dectecting if element is inView and scroll to it.
      this.currentOpts.forEach(function (opt) {
        if (opt.classList.contains(_this9.config.activeClass) && !(0, _isScrolledInView2.default)(_this9.list, opt)) {
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
  }, {
    key: 'setCurrentOptions',
    value: function setCurrentOptions() {
      this.currentOption = this.currentOpts[0]; // Sets the current option index
      return this;
    }
  }, {
    key: 'updateSelectedOptions',
    value: function updateSelectedOptions() {
      var _this10 = this;

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
          _this10.setOptions(item);
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
  }, {
    key: 'transformSelectElement',
    value: function transformSelectElement(selectElement) {
      var _this11 = this;

      // Create the wrapping div element
      var comboElement = document.createElement('div');
      comboElement.className = this.config.wrapClass;
      comboElement.id = selectElement.id + '-combobo';

      if (selectElement.multiple) {
        comboElement.classList.add('multiselect');
      }

      // Create the input element
      var input = document.createElement('input');
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
        if (child.tagName.toLowerCase() === 'optgroup') {
          hasOptgroup = true;
          var optgroup = document.createElement('div');
          optgroup.className = _this11.config.optgroupClass;
          optgroup.setAttribute('role', 'group');
          var groupId = (0, _rndid2.default)();
          optgroup.setAttribute('aria-labelledby', groupId);

          var label = document.createElement('div');
          label.className = _this11.config.optgroupLabelClass;
          label.id = groupId;
          label.textContent = child.label;
          optgroup.appendChild(label);

          Array.from(child.children).forEach(function (option) {
            var data = {
              text: option.textContent,
              value: option.value,
              selected: option.hasAttribute('selected'),
              disabled: option.hasAttribute('disabled')
            };
            optgroup.appendChild(_this11.createOptionElement(data.text, data.value, data.selected, data.disabled));
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
          listbox.appendChild(_this11.createOptionElement(data.text, data.value, data.selected, data.disabled));
        }
      });

      if (hasOptgroup) {
        comboElement.classList.add('has-groups');
      }

      return { comboElement: comboElement, input: input };
    }
  }, {
    key: 'createOptionElement',
    value: function createOptionElement(text, value, selected, disabled) {
      var opt = document.createElement('div');
      opt.className = this.config.optionsClass;
      opt.textContent = text;
      opt.dataset.value = value;
      if (selected) {
        opt.classList.add(this.config.selectedClass);
      }
      if (disabled) {
        opt.classList.add('disabled');
      }
      return opt;
    }
  }, {
    key: 'createOptgroupElement',
    value: function createOptgroupElement(text) {
      var optgroup = document.createElement('div');
      optgroup.className = this.config.optgroupClass;
      optgroup.setAttribute('role', 'group');
      var groupId = (0, _rndid2.default)();
      optgroup.setAttribute('aria-labelledby', groupId);

      var label = document.createElement('div');
      label.className = this.config.optgroupLabelClass;
      label.id = groupId;
      label.textContent = text;
      optgroup.appendChild(label);
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
/* 3 */
/***/ (function(module, exports) {

module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 4 */
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
/* 5 */
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
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

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
/* 6 */
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
 * Expose LiveRegion
 */

if (true) {
  module.exports = LiveRegion;
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.scrolltoElement=t():e.scrolltoElement=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(){}function u(e){function t(e){null===h&&(h=e);var r=e-h,o=u(r/n)*w;l.scrollTop=Math.round(d+o),r<n?(0,a.default)(t):c()}var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=0,u=void 0,c=void 0;if((0,s.isElement)(e))u=f.default.apply(void 0,m),c=i;else{if(!(0,s.isObject)(e))throw new TypeError("The first argument must be HTMLElement or Object.");if(!(0,s.isElement)(e.element))throw new TypeError("`element` must be HTMLElement.");r=(0,s.isNumeric)(e.offset)?e.offset:0,u=(0,s.isArray)(e.bezier)&&4===e.bezier.length?f.default.apply(void 0,o(e.bezier)):f.default.apply(void 0,m),n=e.duration,c=(0,s.isFunction)(e.then)?e.then:i,e=e.element}(!(0,s.isNumeric)(n)||n<0)&&(n=100);var l=(0,p.default)(e),d=l.scrollTop,y=l.offsetTop,h=null,v=void 0;v="BODY"===l.nodeName?e.getBoundingClientRect().top+(window.scrollY||window.pageYOffset||document.body.scrollTop)-y:e.offsetTop-y;var w=v-d+r;(0,a.default)(t)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(4),f=r(c),l=n(7),a=r(l),s=n(2),d=n(3),p=r(d),m=[.19,1,.22,1];t.default=u},function(e,t,n){"use strict";var r=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(r);e.exports=o.default},function(e,t,n){"use strict";function r(e){return Object.prototype.toString.call(e)}function o(e){return"[object Object]"===r(e)}function i(e){return null!=e&&"[object Array]"===r(e)}function u(e){return!isNaN(parseFloat(e))&&isFinite(e)}function c(e){return u(e)&&e>=0}function f(e){return null!=e&&"[object Function]"===r(e)}function l(e){return"object"===a(window.HTMLElement)?e instanceof window.HTMLElement:!!e&&"object"===(void 0===e?"undefined":a(e))&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.isObject=o,t.isArray=i,t.isNumeric=u,t.isPositive=c,t.isFunction=f,t.isElement=l},function(e,t,n){"use strict";function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=e.parentNode;return null===n||"HTML"===n.nodeName?t:r(n,t.concat(n))}function o(e,t){return window.getComputedStyle(e,null).getPropertyValue(t)}function i(e){return o(e,"overflow")+o(e,"overflow-y")}function u(e){if(1===e.nodeType)return f.test(i(e))&&e.scrollHeight>e.clientHeight}function c(e){for(var t=r(e),n=document.body,o=0,i=t.length;o<i;o++)if(u(t[o])){n=t[o];break}return n}Object.defineProperty(t,"__esModule",{value:!0});var f=/(auto|scroll)/;t.default=c},function(e,t){function n(e,t){return 1-3*t+3*e}function r(e,t){return 3*t-6*e}function o(e){return 3*e}function i(e,t,i){return((n(t,i)*e+r(t,i))*e+o(t))*e}function u(e,t,i){return 3*n(t,i)*e*e+2*r(t,i)*e+o(t)}function c(e,t,n,r,o){var u,c,f=0;do{c=t+(n-t)/2,u=i(c,r,o)-e,u>0?n=c:t=c}while(Math.abs(u)>a&&++f<s);return c}function f(e,t,n,r){for(var o=0;o<l;++o){var c=u(t,n,r);if(0===c)return t;t-=(i(t,n,r)-e)/c}return t}var l=4,a=1e-7,s=10,d=11,p=1/(d-1),m="function"==typeof Float32Array;e.exports=function(e,t,n,r){function o(t){for(var r=0,o=1,i=d-1;o!==i&&l[o]<=t;++o)r+=p;--o;var a=(t-l[o])/(l[o+1]-l[o]),s=r+a*p,m=u(s,e,n);return m>=.001?f(t,s,e,n):0===m?s:c(t,r,r+p,e,n)}if(!(0<=e&&e<=1&&0<=n&&n<=1))throw new Error("bezier x values must be in [0, 1] range");var l=m?new Float32Array(d):new Array(d);if(e!==t||n!==r)for(var a=0;a<d;++a)l[a]=i(a*p,e,n);return function(u){return e===t&&n===r?u:0===u?0:1===u?1:i(o(u),t,r)}}},function(e,t,n){(function(t){(function(){var n,r,o,i,u,c;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:void 0!==t&&null!==t&&t.hrtime?(e.exports=function(){return(n()-u)/1e6},r=t.hrtime,n=function(){var e;return e=r(),1e9*e[0]+e[1]},i=n(),c=1e9*t.uptime(),u=i-c):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(t,n(6))},function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(a===setTimeout)return setTimeout(e,0);if((a===n||!a)&&setTimeout)return a=setTimeout,setTimeout(e,0);try{return a(e,0)}catch(t){try{return a.call(null,e,0)}catch(t){return a.call(this,e,0)}}}function i(e){if(s===clearTimeout)return clearTimeout(e);if((s===r||!s)&&clearTimeout)return s=clearTimeout,clearTimeout(e);try{return s(e)}catch(t){try{return s.call(null,e)}catch(t){return s.call(this,e)}}}function u(){y&&p&&(y=!1,p.length?m=p.concat(m):h=-1,m.length&&c())}function c(){if(!y){var e=o(u);y=!0;for(var t=m.length;t;){for(p=m,m=[];++h<t;)p&&p[h].run();h=-1,t=m.length}p=null,y=!1,i(e)}}function f(e,t){this.fun=e,this.array=t}function l(){}var a,s,d=e.exports={};!function(){try{a="function"==typeof setTimeout?setTimeout:n}catch(e){a=n}try{s="function"==typeof clearTimeout?clearTimeout:r}catch(e){s=r}}();var p,m=[],y=!1,h=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new f(e,t)),1!==m.length||y||o(c)},f.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=l,d.addListener=l,d.once=l,d.off=l,d.removeListener=l,d.removeAllListeners=l,d.emit=l,d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,t,n){(function(t){for(var r=n(5),o="undefined"==typeof window?t:window,i=["moz","webkit"],u="AnimationFrame",c=o["request"+u],f=o["cancel"+u]||o["cancelRequest"+u],l=0;!c&&l<i.length;l++)c=o[i[l]+"Request"+u],f=o[i[l]+"Cancel"+u]||o[i[l]+"CancelRequest"+u];if(!c||!f){var a=0,s=0,d=[];c=function(e){if(0===d.length){var t=r(),n=Math.max(0,1e3/60-(t-a));a=n+t,setTimeout(function(){var e=d.slice(0);d.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(a)}catch(e){setTimeout(function(){throw e},0)}},Math.round(n))}return d.push({handle:++s,callback:e,cancelled:!1}),s},f=function(e){for(var t=0;t<d.length;t++)d[t].handle===e&&(d[t].cancelled=!0)}}e.exports=function(e){return c.call(o,e)},e.exports.cancel=function(){f.apply(o,arguments)},e.exports.polyfill=function(){o.requestAnimationFrame=c,o.cancelAnimationFrame=f}}).call(t,n(8))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n}])});

/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _value = __webpack_require__(11);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (el) {
  return el.getAttribute('data-value') || el.innerText;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keymap = __webpack_require__(13);

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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _select = __webpack_require__(16);

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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (groups, option) {
  var matches = groups.filter(function (g) {
    return g.options.indexOf(option) > -1;
  });
  return matches.length && matches[0];
};

/***/ }),
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Wraps any matches (between input value on option) in a span with the accent class
 * @param  {HTMLElement} optionEl    The option element
 * @param  {HTMLElement} input       The input element
 * @param  {String} accentClass      The class to be added to the match span
 * @return {String}                  The result html string
 */

module.exports = function (optionEl, input, accentClass) {
  var inputText = input.value;
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extendShallow = __webpack_require__(22);

var _extendShallow2 = _interopRequireDefault(_extendShallow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The default config for Combobo
 * @type {Object}
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
  filter: 'contains', // 'starts-with', 'equals', or funk
  autoFilter: true // will enable filter options on front-end
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
/* 22 */
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