'use strict';

import Classlist from 'classlist';
import Emitter from 'component-emitter';
import LiveRegion from 'live-region';
import scrollToElement from 'scrollto-element';
import inView from './lib/utils/is-scrolled-in-view';
import viewportStatus from './lib/utils/viewport-status';
import filters from './lib/filters';
import * as keyvent from './lib/utils/keyvent';
import isWithin from './lib/utils/is-within';
import elHandler from './lib/utils/element-handler';
import getCurrentGroup from './lib/current-group';
import noResultsHandler from './lib/no-results';
import attrs from './lib/attributes';
import wrapMatch from './lib/utils/wrap-match';
import configuration from './lib/config';
import announceActive from './lib/announce-active';
import rndid from './lib/utils/rndid';
import extendShallow from 'extend-shallow';

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

export class Combobo {

  /**
   * Combobo constructor
   *
   * @param {import('./lib/config').ComboboConfig} Config
   * @returns {Combobo|Object}
   */
  constructor(config) {
    Emitter(this);
    config = config || {};

    /**
     * Merge user's config with defaults
     *
     * @type {import('./lib/config').ComboboConfig}
     */
    this.config = configuration(config);

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
     * @type {HTMLDivElement[]|[]}
     * @default []
     */
    this.currentOpts = [];
    /**
     * @type {HTMLDivElement[]|[]}
     * @default []
     */
    this.cachedOpts = [];
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
      let combobos = {};

      const selectElements = elHandler(this.config.select, true);
      const inputElements = elHandler(this.config.input, true);

      if (inputElements && inputElements.length && !this.config.select.startsWith('#')) {
        inputElements.forEach((input) => {
          let config = Object.assign({}, this.config);

          // If selectOnly is true, change the <input> to a <div>.
          // Force <select>-like behavior by overriding the `filter` and `autoFilter` options.
          if (this.config.selectOnly) {
            config.filter = 'starts-with';
            config.autoFilter = false;

            if (input.tagName.toLowerCase() === 'input') {
              config.inputElm = input;
              const inputDivEl = document.createElement('div');

              // Copy attributes from the <input> to the <div>, except for `type` and `value`
              [...input.attributes].forEach(attr => {
                if (['type', 'value'].includes(attr.name)) {
                  return;
                }
                inputDivEl.setAttribute(attr.name, attr.value);
              });

              config.inputElm.style.display = 'none';
              config.inputElm.insertAdjacentElement('afterend', inputDivEl);

              inputDivEl.setAttribute('tabindex', '0');
              inputDivEl.id = `${input.id}-combobo`; // Prevent duplicate IDs with hidden <input>

              // Rewrite the label's `for` attribute to match the new combobox <div>'s ID
              this.reassignLabel(input, inputDivEl);

              input = inputDivEl;
            }
          }

          input.id = input.id || rndid();
          config.input = input;
          config.internalCall = true;
          combobos[input.id]= new Combobo(config); 
        })
      }
      if ( selectElements && selectElements.length && !this.config.input.startsWith('#')) {
        selectElements.forEach((selectElement)=>{
          selectElement.id = selectElement.id || rndid();
          // To ensure that the combobo reinitializes when initialized
          const initializedCombobo = document.getElementById(`${selectElement.id}-combobo`)
          if (initializedCombobo) {
            initializedCombobo.remove();
          }

          const transformData = this.transformSelectElement(selectElement);
          selectElement.parentNode.insertBefore(transformData.comboElement, selectElement.nextSibling);
          let config = Object.assign({}, this.config);
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

    this.input = elHandler(this.config.input);
    this.selectElm = elHandler(this.config.select);
    this.toggleButtonIcon = this.config.toggleButtonIcon;
    // The list and toggle button should be within the parent of Input.
    if (this.input && this.input.parentNode) {
      this.list = elHandler(this.config.list, false, this.input.parentNode);
      this.toggleButton = elHandler(this.config.toggleButton, false, this.input.parentNode);

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
      this.config.source.forEach(option => {
        if (option.label && option.options) { // If option is an optgroup
          /**
           * @type {OptGroup}
           */
          const optGroup = {
            label: option.label,
            className: option.className,
            option: option.options
          };
          this.addOptGroup(optGroup);
        } else {
          this.addOption(option);
        }
      });
      
      this.cachedOpts = [...this.currentOpts];
    } else {
      this.currentOpts = elHandler(this.config.options, true, this.list);
      this.cachedOpts = [...this.currentOpts];
    }

    if (this.config.placeholderText) {
      this.addPlaceholder();
    }

    // option groups
    if (this.config.groups) {
      const groupEls = elHandler(this.config.groups, true, this.list);
      this.groups = groupEls.map((groupEl) => {
        return {
          element: groupEl,
          options: this.cachedOpts.filter((opt) => groupEl.contains(opt))
        };
      });
    }

    attrs(this.input, this.list, this.cachedOpts);

    if (this.config.useLiveRegion) {
      this.liveRegion = new LiveRegion({ ariaLive: 'assertive' });
    }

    this.initEvents();

    if (this.config.disabled || (this.selectElm && this.selectElm.disabled)) {
      this.disable();
    }

    // Initialize the selected based on the selected options.
    for (const option of this.currentOpts) {
      if (option.classList.contains(this.config.selectedClass)) {
        this.currentOption = option;
        this.select();
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
  reassignLabel(el, newEl) {
    const newElId = newEl.id;
    const label = el.labels[0] || ((el.previousElementSibling && el.previousElementSibling.tagName.toLowerCase() === 'label') ? el.previousElementSibling : undefined);

    if (label) {
      label.htmlFor = newElId;

      const labelId = label.id || rndid();

      if (!label.id) {
        label.id = labelId;
      }

      newEl.setAttribute('aria-labelledby', labelId);
    }
  }

  initEvents() {
    if (!this.optionsWithKeyEventHandlers.has(this.input) && this.config.internalCall) {
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
      document.addEventListener('click', (e) => {
        const isOrWithin = isWithin(e.target, [this.input, this.list, this.toggleButton], true);
        if (!isOrWithin && this.isOpen) { this.closeList(); }
      });

      this.optionsWithKeyEventHandlers.add(this.input);
    }

    this.optionEvents();
    this.initKeys();

    return this;
  }

  addEvent(event, element, cb = () => { }) {
    if (element) {
      element.addEventListener(event, (...args) => {
        this.eventWrapper(cb, ...args);
      });
    }
  }

  /**
   * 
   * @param {Function} cb 
   * @param {any[]} binds
   */
  eventWrapper(cb, ...args) {
    if (this.disabled) {
      return;
    }
    return cb.bind(this)(...args);
  }

  setHovering() {
    this.isHovering = true;
  }

  setNotHovering() {
    this.isHovering = false;
  }

  /**
   * Toggles the open state of the combobo when the toggle button is clicked.
   * 
   * @param {MouseEvent} e 
   */
  handleToggleButtonClick(e) {
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

  handleInputClick() {
    if (this.disabled) {
      return;
    }
    this.openList().goTo(this.getOptIndex() || 0); // ensure it's open
  }

  handleInputBlur() {
    if (!this.isHovering) { this.closeList(); }
  }

  handleInputFocus() {
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

  getOptIndex() {
    return this.currentOption && this.currentOpts.indexOf(this.currentOption);
  }

  optionEvents() {
    this.cachedOpts.forEach((option) => {
      this.addEventsToOptionEl(option);
    });
    return this;
  }

  /**
   * Adds event handlers to the option element
   * 
   * @param {HTMLDivElement} option 
   */
  addEventsToOptionEl(option) {
    if (!this.config.internalCall) {
      // Add event listeners to the option element later?
      return;
    }
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
  handleOptionClick(option) {
    this
      .goTo(this.currentOpts.indexOf(option))
      .select();
  }

  /**
   * @param {HTMLDivElement} option 
   */
  handleOptionMouseOver(option) {
    // clean up
    const prev = this.currentOption;

    if (prev) {
      prev.classList.remove(this.config.activeClass);
    }
    option.classList.add(this.config.activeClass);
    this.isHovering = true;
  }

  /**
   * @param {HTMLDivElement} option 
   */
  handleOptionMouseOut(option) {
    option.classList.remove(this.config.activeClass);
    this.isHovering = false;
  }

  openList() {
    Classlist(this.list).add(this.config.openClass);
    this.input.setAttribute('aria-expanded', 'true');
    if (!this.isOpen) {
      // announcing count
      this.announceCount();
    }
    this.isOpen = true;
    this.emit('list:open');
    const status = viewportStatus(this.list);
    if (!status.visible) {
      const offset = status.position === 'bottom' ?
        0 - (window.innerHeight - (this.input.clientHeight + this.list.clientHeight)) :
        0;

      scrollToElement({
        element: this.input,
        offset: offset,
        bezier: [0.19, 1, 0.22, 1],
        duration: 100
      });
    }
    
    return this;
  }

  closeList(focus, selectText) {
    Classlist(this.list).remove(this.config.openClass);
    this.input.setAttribute('aria-expanded', 'false');
    this.isOpen = false;
    if (focus) { this.input.focus(); }
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

  getSearchString(char) {
    if (!char) {
      return this.searchString;
    }
    // Reset typing timeout and start new timeout
    // This allows us to make multiple-letter matches, like a native <select>
    if (typeof this.searchTimeout === 'number') {
      window.clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = window.setTimeout(() => {
      this.searchString = '';
    }, this.config.selectSearchTimeout);

    // Add most recent letter to saved search string
    this.searchString = this.searchString ? this.searchString + char : char;
    return this.searchString.toLowerCase();
  }

  initKeys() {
    // keydown listener
    if (this.optionsWithKeyEventHandlers.has(this.input)) {
      return;
    } else {
      this.optionsWithKeyEventHandlers.add(this.input);
    }
    keyvent.down(this.input, [{
      keys: ['up', 'down'],
      callback: (e, k) => {
        if (this.isOpen) {
          // if typing filtered out the pseudo-current option
          if (this.currentOpts.indexOf(this.currentOption) === -1) {
            return this.goTo(0, true);
          }
          return this.goTo(k === 'down' ? 'next' : 'prev', true);
        }

        const idx = this.selected.length
          ? this.currentOpts.indexOf(this.selected[this.selected.length - 1])
          : 0

        this
          .goTo(idx, true)
          .openList();
      },
      preventDefault: true
    }, {
      keys: ['enter'],
      callback: () => {
        if (this.isOpen) {
          this.select();
        } else {
          this.openList();
        }
      }
    }, {
      keys: ['escape'],
      callback: (e) => {
        if (this.isOpen) {
          e.stopPropagation();
          this.closeList(true, true);
        }
      }
    }, {
      keys: ['backspace'],
      callback: () => {
        if (this.selected.length >= 2) {
          this.input.value = '';
        }
      }
    }]);

    /**
     * Stop spacebar from scrolling the page when an input is focused and/or open the list
     */
    keyvent.down(window, (e) => {
      const { key } = e;
      if (key === ' ' && e.target === this.input) {
        if (this.config.selectOnly) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (!this.isOpen) {
          this.openList();
        }
      }
    });

    keyvent.down(this.input, (e) => {
      const { key, metaKey, ctrlKey, altKey } = e;
      if ( metaKey || ctrlKey || altKey ) {
        return;
      }

      if ( key && [' ', 'tab', 'backspace'].includes(key.toLowerCase()) && this.isOpen ) {
        // Don't close (+select) the list if the user is typing in the input
        if (!this.config.selectOnly && key.toLowerCase() === 'backspace') {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        this.select();
        this.closeList();
      }
    } );
    
    if (this.config.selectOnly) {
      keyvent.up(this.input,
        /**
        * @param {KeyboardEvent} e
        */
        (e) => {
          const { key, altKey, ctrlKey, metaKey } = e;
          const alpha = new Array(26).fill(1).map((_, i) => String.fromCharCode('a'.charCodeAt(0) + i));

          if (!alpha.includes(key) || key === ' ' || altKey || ctrlKey || metaKey) {
            return;
          }

          e.preventDefault();
          e.stopPropagation();

          const searchString = this.getSearchString(key);

          if (!this.isOpen) {
            this.openList();
          }

          const searchIndex = this.searchIndex(searchString);
          if (searchIndex > -1) {
            this.goTo(searchIndex);
          }
        }
      );

      this.input.addEventListener('blur', () => {
        this.searchString = '';
        if (this.selected.length) {
          this.input.innerText = this.config.selectionValue(this.selected);
        }
      });
    }

    // ignore tab, enter, escape and shift
    const ignores = [9, 13, 27, 16];
    // filter keyup listener
    keyvent.up(this.input, (e) => {
      // If autoFilter is false, key up filter not required
      if (!this.autoFilter) {
        return;
      }
      const filter = this.config.filter;
      const cachedVal = this.cachedInputValue;
      if (ignores.indexOf(e.which) > -1 || !filter || this.input.tagName.toLowerCase() === 'div') { return; }

      // Handles if there is a fresh selection
      if (this.freshSelection) {
        this.clearFilters();
        if (cachedVal && (cachedVal.trim() !== this.input.value.trim())) { // if the value has changed...
          this.filter().openList();
          this.freshSelection = false;
        }
      } else {
        this.filter().openList();
      }

      // handle empty results
      noResultsHandler(this.list, this.currentOpts, this.config.noResultsText);
    });
  }

  // Keep track of the search string for a more <select>-like experience
  searchIndex(searchString) {
    const currentIndex = this.getOptIndex();
    const queryString = searchString.trim();
    const firstLetter = queryString[0];
    const isRepeatedLetter = queryString === firstLetter.repeat(queryString.length) && queryString.length > 1;

    // All possible matches; we'll cycle through them if the user presses the same letter multiple times.
    const matches = this.currentOpts.filter((opt) => {
      return opt.textContent.toLowerCase().startsWith(isRepeatedLetter ? firstLetter : queryString);
    })

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

    const matchIndex = matches.indexOf(this.currentOption);

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

  clearFilters() {
    if (this.config.selectOnly) { return; }
    this.cachedOpts.forEach((o) => o.style.display = '');
    this.groups.forEach((g) => g.element.style.display = '');
    // show all opts
    this.currentOpts = this.cachedOpts;
    return this;
  }

  filter(suppress, value) {
    if (!value) {
      value = this.config.selectOnly ? this.input.innerText : this.input.value;
    }
    const filter = this.config.filter;

    if (this.config.selectOnly && typeof filter !== 'function') {
      return this;
    }

    const befores = this.currentOpts;
    this.currentOpts = typeof filter === 'function' ?
      filter(value.trim(), this.cachedOpts) :
      filters[filter](value.trim(), this.cachedOpts);
    // don't let user's functions break stuff
    this.currentOpts = this.currentOpts || [];
    this.updateOpts();
    // announce count only if it has changed
    if (!befores.every((b) => this.currentOpts.indexOf(b) > -1) && !suppress) {
      this.announceCount();
    }

    return this;
  }

  announceCount() {
    const count = this.config.announcement && this.config.announcement.count;

    if (count && this.liveRegion) {
      this.liveRegion.announce(count(this.currentOpts.length), 500);
    }

    return this;
  }

  updateOpts() {
    const optVal = this.config.optionValue;
    this.cachedOpts.forEach((opt) => {
      // configure display of options based on filtering
      opt.style.display = this.currentOpts.indexOf(opt) === -1 ? 'none' : '';
      // configure the innerHTML of each option
      opt.innerHTML = typeof optVal === 'string' ?
        wrapMatch(opt, this.input.tagName.toLowerCase() === 'div' ? this.getSearchString() : this.input.value, optVal) :
        optVal(opt);
    });

    this.updateGroups();
    return this;
  }

  updateGroups() {
    this.groups.forEach((groupData) => {
      const visibleOpts = groupData.options.filter((opt) => opt.style.display === '');
      groupData.element.style.display = visibleOpts.length ? '' : 'none';
    });
    return this;
  }

  /**
   * Selects the current option
   */
  select() {
    const currentOpt = this.currentOption;

    if (!currentOpt) { return; }

    const idx = this.selected.indexOf(currentOpt);
    const wasSelected = idx > -1;

    const cb = wasSelected ? this.config.onDeselection : this.config.onSelection;

    if (!this.config.multiselect && this.selected.length) { // clean up previously selected
      Classlist(this.selected[0]).remove(this.config.selectedClass)
    }


    // Multiselect option
    if (this.config.multiselect) {
      // If option is in array and gets clicked, remove it
      if (wasSelected) {
        this.selected.splice(idx, 1);
      } else {
        this.selected.push(currentOpt);
      }
    } else {
      this.selected = (this.config.allowEmpty && wasSelected && !this.config.selectOnly)
        ? []
        : [currentOpt]
    }

    if (cb && typeof cb === 'function') {
      const res = cb({ currentOpt, selected: this.selected, instance: this});

      // If the callback returns false, prevent the (de)selection(s).
      if (res === false) {
        return this;
      }
    }

    const value = this.selected.length
      ? this.config.selectionValue(this.selected)
      : '';

    if (wasSelected) {
      currentOpt.classList.remove(this.config.selectedClass);
      this.emit('deselection', { value: currentOpt.dataset.value, label: value, text: value, option: currentOpt });
    } else {
      currentOpt.classList.add(this.config.selectedClass)
      this.emit('selection', { value: currentOpt.dataset.value, label: value, text: value, option: currentOpt });
    }

    // Clean up stale selected options
    this.currentOpts.forEach((opt) => {
      if (this.selected.includes(opt)) {
        opt.classList.add(this.config.selectedClass);
        opt.setAttribute('aria-selected', 'true');
      } else {
        opt.classList.remove(this.config.selectedClass);
        opt.setAttribute('aria-selected', 'false');
      }
    });

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
    this.filter(true).clearFilters()

    // close the list for single select
    // (leave it open for multiselect)
    if (!this.config.multiselect) {
      this.closeList();
      if (!this.config.selectOnly) {
        this.input.select();
      }
    }

    if ( this.selectElm ) {
      const values = this.value();
      for (const option of this.selectElm.options) {
        if (this.config.multiselect) {
          option.selected = values.indexOf(option.value) !== -1;
        } else {
          option.selected = option.value === values;
        }
      }
    }

    return this;
  }

  reset() {
    this.clearFilters();
    this.input[this.input.tagName.toLowerCase() === 'input' ? 'value' : 'innerText'] = '';
    this.updateOpts();
    this.input.removeAttribute('aria-activedescendant');
    this.input.removeAttribute('data-active-option');
    this.currentOption = null;
    this.selected = [];
    this.cachedOpts.forEach((optEl) => {
      Classlist(optEl).remove(this.config.selectedClass);
      Classlist(optEl).remove(this.config.activeClass);
      optEl.setAttribute('aria-selected', 'false');
    });
    this.searchString = '';
    return this;
  }

  goTo(option, fromKey) {
    if (typeof option === 'string') { // 'prev' or 'next'
      const optIndex = this.getOptIndex();
      return this.goTo(option === 'next' ? optIndex + 1 : optIndex - 1, fromKey);
    }

    const newOpt = this.currentOpts[option];
    let groupChange = false;

    if (!this.currentOpts[option]) {
      // end of the line so allow scroll up for visibility of potential group labels
      if (this.getOptIndex() === 0) { this.list.scrollTop = 0; }
      return this;
    } else if (this.groups.length) {
      const newGroup = getCurrentGroup(this.groups, newOpt);
      groupChange = newGroup && newGroup !== this.currentGroup;
      this.currentGroup = newGroup;
    }

    // update current option
    this.currentOption = newOpt;
    // show pseudo focus styles
    this.pseudoFocus(groupChange);
    // Detecting if element is inView and scroll to it.
    this.currentOpts.filter(Boolean).forEach((opt) => {
      if (opt.classList.contains(this.config.activeClass) && !inView(this.list, opt)) {
        scrollToElement(opt);
      }
    });

    return this;
  }

  pseudoFocus(groupChanged) {
    const option = this.currentOption;
    const activeClass = this.config.activeClass;
    const prevId = this.input ? this.input.getAttribute('data-active-option') : null;
    const prev = prevId && document.getElementById(prevId);

    // clean up
    if (prev && activeClass) {
      Classlist(prev).remove(activeClass);
    }

    if (option) {
      this.input && this.input.setAttribute('data-active-option', option.id);
      if (activeClass) { Classlist(option).add(activeClass); }

      if (this.liveRegion) {
        announceActive(
          option,
          this.config,
          this.liveRegion.announce.bind(this.liveRegion),
          groupChanged,
          this.currentGroup && this.currentGroup.element
        );
      }

      this.input && this.input.setAttribute('aria-activedescendant', option.id);
      this.currentOption = option;
      this.addEventListener && this.emit('change');
    }
    return this;
  }


  setOptions(option) {
    // The below code adds the  new option to current Dropdown list
    if (typeof option === 'object') { // This needs to be check for passing unit test
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
  clearOptions(args = {}) {
    args = extendShallow({ usePlaceholder: true }, args);

    this.emptyDropdownList().reset();

    if (this.list) {
      const listChildNodes = Array.from(this.list.childNodes)

      listChildNodes.forEach((child) => {
        this.list.removeChild(child);
      });
    }

    if (this.selectElm) {
      const selectChildNodes = Array.from(this.selectElm.childNodes);
      
      selectChildNodes.forEach((child) => {
        this.selectElm.removeChild(child);
      });
    }

    this.currentOpts = [];
    this.cachedOpts = [];
    this.groups = [];

    if ((this.config.placeholderText || args.placeholder ) && args.usePlaceholder) {
      this.addPlaceholder({ label: (this.config.placeholderText || args.placeholder) });
    }

    return this;
  }

  /**
   * Adds a placeholder option to the Combobo. This option will be the first option in the Combobo and will be disabled.
   * 
   * @param {Option} args
   */
  addPlaceholder(args = {}) {
    const placeholder = extendShallow({ label: this.config.placeholderText, value: '', disabled: true, selected: true}, args);
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
   * @note This is largely a convenience method for adding multiple options at once and
   * is equivalent to calling {@link addOption()} and/or {@link addOptGroup()} multiple times.
   *
   * @example
   * // A simple example with two options
   * combobo.addOptions( [
   *  { label: 'Option 1', value: 'option1', selected: true, disabled: true },
   *  { label: 'Option 2', value: 'option2', selected: false },
   * ] );
   * // An example with an optgroup
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
  addOptions(options) {
    if (Array.isArray(options) && options.length > 0) {
      options.forEach(option => {
        if (option.label && option.options) {
          this.addOptGroup(option)
        } else {
          this.addOption(option);
        }
      });
    }
    return this;
  }

  /**
   * Add an optgroup to the Combobo.
   *
   * @typedef {Object} OptGroup
   * @property {String} label The label of the optgroup
   * @property {string} [className] The original class of the optgroup
   * @property {Option[]} options The options of the optgroup
   * 
   * @param {OptGroup} optGroup The optgroup to be added to the Combobo
   * @param {'top'|'bottom'} placement The placement of the optgroup in the Combobo
   * @param {HTMLElement} [parentEl] The parent element of the optgroup. Will default to the list if not provided
   */
  addOptGroup({ label, className, dataset, options } = {}, placement = 'bottom', parentEl = null) {
    if (this.selectElm) {
      const group = document.createElement('optgroup');
      group.label = label;
      group.dataset = dataset;
      group.classList.add(className);

      options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.selected = opt.selected;
        option.disabled = opt.disabled;
        if (opt.dataset) {
          Object.keys(opt.dataset).forEach(key => {
            option.dataset[key] = opt.dataset[key];
          });
        }
        option.innerHTML = opt.label;
        option.classList.add(opt.className);

        group.appendChild(option);
      });

      if (placement === 'top') {
        this.selectElm.prepend(group);
      } else {
        this.selectElm.append(group);
      }
    }

    const parent = parentEl || this.list;

    if (!parent) {
      return;
    }

    const optgroupElm = this.createOptgroupElement(label, className);

    let optionElms = [];

    options.forEach(opt => {
      const optionElm = this.createOptionElement(opt);
      optgroupElm.appendChild(optionElm);
      optionElms.push(optionElm);
      this.cachedOpts.push(optionElm);
      this.currentOpts.push(optionElm);
    });

    if (placement === 'top') {
      parent.prepend(optgroupElm);
    } else {
      parent.append(optgroupElm);
    }

    this.groups.push({
      label,
      element: optgroupElm,
      options: optionElms
    });

    return optgroupElm;
  }

  /**
   * Add a new option to the Combobo
   *
   * @typedef {Object} Option
   * @property {String} label The text label of the option
   * @property {String} [text] The value of the option (Deprecated; use `label` instead)
   * @property {String} value The value of the option
   * @property {Boolean} [selected] Whether the option is selected
   * @property {Boolean} [disabled] Whether the option is disabled
   * @property {String} [className] The original class of the option
   *
   * @param {Option} option The option to be added to the Combobo
   * @param {'top'|'bottom'} [placement] The placement of the option in the Combobo
   * @param {HTMLDivElement} [parentEl] The parent element of the option. Will default to the list if not provided
   * @param {Boolean} [eventHandlers] Whether to add event handlers to the option
   */
  addOption({ label, text, value, selected = false, disabled = false, dataset, className } = {}, placement = 'bottom', parentEl = null, eventHandlers = true) {
    if (!label) {
      return this;
    }

    if (this.selectElm) {
      const option = document.createElement('option');
      option.value = value;
      option.selected = selected;
      option.disabled = disabled;
      option.innerHTML = label || text;
      option.classList.add(className);
      if (dataset) {
        Object.keys(dataset).forEach(key => {
          option.dataset[key] = dataset[key];
        });
      }

      if (placement === 'top') {
        this.selectElm.prepend(option);
      } else {
        this.selectElm.append(option);
      }
    }

    const optionElm = this.createOptionElement({ label: label || text, value, selected, disabled, dataset, className });

    const parent = parentEl || this.list;

    if (!parent) {
      return this;
    }

    if (placement === 'top') {
      parent.prepend(optionElm);
      this.currentOpts.unshift(optionElm);
      this.cachedOpts.unshift(optionElm);
    } else {
      parent.append(optionElm);
      this.currentOpts = [...this.currentOpts, optionElm];
      this.cachedOpts = [...this.cachedOpts, optionElm];
    }

    if (eventHandlers) {
      this.addEventsToOptionEl(optionElm);
      if (selected && this.config.internalCall) {
        // This function may be called before this.list/this.input are initialized. If they aren't, skip it; it gets added later.
        this.goTo(this.currentOpts.indexOf(optionElm), true).select();
      }
    }

    return this;
  }

  setCurrentOptions() {
    this.currentOption = this.currentOpts[0]; // Sets the current option index
    return this;
  }

  updateSelectedOptions() {
    const list = document.getElementById(this.config.list.id);
    const selectedList = this.selected;
    this.emptyDropdownList();

    // The below code will remove all child elements in the dropdown list
    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    // The below code will append the selected options to the dropdown list if any
    if (selectedList.length > 0) {
      selectedList.forEach(item => {
        this.setOptions(item);
      });
    }
    return this;
  }

  emptyDropdownList() {
    // empty the cachedOpts and currentOpts of dropdown list
    this.currentOpts = [];
    this.cachedOpts = [];
    this.optionsWithEventHandlers.clear();
    return this;
  }

  setNoResultFound() {
    // handle empty results whenever user perform search and if no relevant records found 
    noResultsHandler(this.list, this.currentOpts, this.config.noResultsText);
  }

  value() {
    let selected = [];

    this.selected.forEach(selectedElm => {
      if (selectedElm.hasAttribute('data-value')) {
        selected.push(selectedElm.dataset.value);
      } else {
        selected.push(selectedElm.innerText);
      }
      
    })

    if (!this.config.multiselect) {
      return (selected && selected.length) ? selected[0] : null
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
  disable() {
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
  enable() {
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
  transformSelectElement(selectElement) {
    // Get the class name on the original element
    const className = selectElement.className;

    // Create the wrapping div element
    const comboElement = document.createElement('div');
    comboElement.className = [this.config.wrapClass, className].filter(Boolean).join(' ');
    comboElement.id = `${selectElement.id}-combobo`;
    if (selectElement.hasAttribute('placeholder')) {
      this.config.placeholderText = selectElement.getAttribute('placeholder');
    }

    if (selectElement.multiple) {
      comboElement.classList.add('multiselect');
    }

    // Create the input element
    const inputEl = this.config.selectOnly ? 'div' : 'input';
    const input = document.createElement(inputEl);
    input.setAttribute('tabindex', '0');
    input.type = 'text';
    input.className = this.config.inputClass;
    input.id = `${selectElement.id}-input`;
    comboElement.appendChild(input);

    // Create the toggle button
    const toggleButton = document.createElement('span');
    toggleButton.setAttribute('aria-hidden', 'true');
    toggleButton.className = this.config.toggleButtonClass;
    comboElement.appendChild(toggleButton);

    // Create the listbox
    const listbox = document.createElement('div');
    listbox.className = this.config.listClass;
    comboElement.appendChild(listbox);
  
    let hasOptgroup = false;
    // Process groups and options
    Array.from(selectElement.children).forEach(child => {
      const origOptgroup = child.tagName.toLowerCase() === 'optgroup';
      if (origOptgroup) {
        hasOptgroup = true;
        const origOptgroupClass = child.className;
        /**
         * @type {OptGroup}
         */
        const optGroup = {
          label: child.label,
          className: origOptgroupClass,
          dataset: child.dataset,
          options: []
        };

        /**
         * @type {Option[]}
         */
        optGroup.options = Array.from(child.children).map(option => {
          return {
            label: option.textContent,
            value: option.value,
            selected: option.hasAttribute('selected'),
            disabled: option.hasAttribute('disabled'),
            dataset: option.dataset,
            className: option.className
          };
        });

        this.addOptGroup(optGroup, 'bottom', listbox);
      } else {
        // In case there are direct options without a group
        this.addOption(
          {
            label: child.textContent,
            value: child.value,
            selected: child.hasAttribute('selected'),
            disabled: child.hasAttribute('disabled'),
            dataset: child.dataset,
            class: child.className,
          },
          'bottom',
          listbox,
          false
        );
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

    return { comboElement, input };
  }

  /**
   * Returns a new option element for the listbox.
   * 
   * @param {string} label The label/text of the option
   * @param {string} [text] The label/text of the option (Deprecated; use `label` instead)
   * @param {string} [value] The value of the option
   * @param {boolean} [selected] If the option is selected
   * @param {boolean} [disabled] If the option is disabled
   * @param {string} [className] The original class of the option
   *
   * @returns {HTMLDivElement}
   */
  createOptionElement({ label, text, value, selected, disabled, dataset, className } = {}) {
    const optArgs = Object.assign({
      selected: false,
      disabled: false,
    },
    { label, text, value, selected, disabled, className }
    );
    const optId = rndid();
    const opt = document.createElement('div');

    opt.className = [this.config.optionsClass, optArgs.className].filter(Boolean).join(' ');
    opt.innerHTML = optArgs.label || optArgs.text;
    opt.dataset.value = optArgs.value;
    opt.id = optId;

    opt.setAttribute('role', 'option');
    opt.setAttribute('aria-selected', optArgs.selected ? 'true' : 'false');

    if (dataset) {
      Object.keys(dataset).forEach(key => {
        if (key === 'value') {
          return;
        }
        opt.dataset[key] = dataset[key];
      });
    }

    if (optArgs.selected) {
      opt.classList.add(this.config.selectedClass);
    }

    if (optArgs.disabled) {
      opt.classList.add('disabled');
    }

    return opt;
  }

  /**
   * Returns a new optgroup element for the listbox.
   * 
   * @param {string} label The label/text of the optgroup
   * @param {string} className The original class of the optgroup
   * 
   * @returns {HTMLDivElement}
   */
  createOptgroupElement(label, className = '', dataset = {}) {
    const groupId = rndid();

    const optgroup = document.createElement('div');
    optgroup.classList.add(...[this.config.optgroupClass, className].filter(Boolean))
    optgroup.setAttribute('role', 'group');
    optgroup.setAttribute('aria-labelledby', groupId);
    if (dataset) {
      Object.keys(dataset).forEach(key => {
        optgroup.dataset[key] = dataset[key];
      });
    }

    const labelEl = document.createElement('div');
    labelEl.className = this.config.optgroupLabelClass;
    labelEl.id = groupId;
    labelEl.innerHTML = label;

    optgroup.append(labelEl);

    return optgroup;
  }
}

export default Combobo;

/**
 * NOTE:
 * - https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/#combobox
 *    - "For each combobox pattern the button need not be in the tab order if there
 *    is an appropriate keystroke associated with the input element such that when
 *    focus is on the input, the keystroke triggers display of the associated drop
 *    down list."
 */
