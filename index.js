'use strict';

import Classlist from 'classlist';
import Emitter from 'component-emitter';
import LiveRegion from 'live-region';
import scrollToElement from 'scrollto-element';
import inView from './lib/utils/is-scrolled-in-view';
import viewportStatus from './lib/utils/viewport-status';
import filters from './lib/filters';
import keyvent from './lib/utils/keyvent';
import isWithin from './lib/utils/is-within';
import elHandler from './lib/utils/element-handler';
import getCurrentGroup from './lib/current-group';
import noResultsHandler from './lib/no-results';
import attrs from './lib/attributes';
import wrapMatch from './lib/utils/wrap-match';
import configuration from './lib/config';
import announceActive from './lib/announce-active';
import rndid from './lib/utils/rndid';

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

module.exports = class Combobo {
  constructor(config) {
    config = config || {};

    // merge user config with default config
    this.config = configuration(config);

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
      let combobos = {};

      const selectElements = elHandler(this.config.select, true);
      const inputElements = elHandler(this.config.input, true);

      if (inputElements && inputElements.length && !this.config.select.startsWith('#')) {
        inputElements.forEach((input) => {
          let config = Object.assign({}, this.config);

          // If selectOnly is true, change the <input> to a <div>.
          // Force <select>-like behavior by overriding the `filter` and `autoFilter` options.
          if (this.config.selectOnly) {
            this.config.filter = 'starts-with';
            this.config.autoFilter = false;
            if (input.tagName.toLowerCase() === 'input') {
              const inputDivEl = document.createElement('div');
              [...input.attributes].forEach(attr => {
                inputDivEl.setAttribute(attr.name, attr.value);
              });
              input.replaceWith(inputDivEl);
              inputDivEl.setAttribute('tabindex', '0');
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
      this.config.source.forEach(option=>{
        if (option.label && option.options) { // If option is an optgroup
          const optgroupElm = this.createOptgroupElement(option.label);
          option.options.forEach(opt => {
              const optionElm = this.createOptionElement(opt.text, opt.value, opt.selected, opt.disabled);
              optgroupElm.appendChild(optionElm); // Add option to optgroup
              this.currentOpts.push(optionElm);
          });
          this.list.appendChild(optgroupElm); // Add optgroup to the list
        } else { // If option is a standalone option
            const optionElm = this.createOptionElement(option.text, option.value, option.selected, option.disabled);
            this.list.appendChild(optionElm);
            this.currentOpts.push(optionElm);
        }
      });
      
      this.cachedOpts = this.currentOpts;
    } else {
      this.cachedOpts = this.currentOpts = elHandler((this.config.options), true, this.list);
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

    // Initialize the selected based on the selected options.
    for (const option of this.currentOpts) {
      if (option.classList.contains(this.config.selectedClass)) {
        this.currentOption = option;
        this.select();
      }
    }
    
  }

  initEvents() {
    Emitter(this);
    if (!this.optionsWithKeyEventHandlers.has(this.input)) {
      this.input.addEventListener('click', () => {
        this.openList().goTo(this.getOptIndex() || 0); // ensure its open
      });

      this.input.addEventListener('blur', () => {
        if (!this.isHovering) { this.closeList(); }
      });

      this.input.addEventListener('focus', () => {
        if (this.selected.length) {
          this.input.value = this.selected.length >= 2 ? '' : this.config.selectionValue(this.selected);
        }
        if (!this.config.selectOnly) {
          this.input.select();
        }
      });

      if (this.toggleButton) {
        // handle trigger clicks to toggle state of the 
        this.toggleButton.addEventListener('click', (e) => {
          e.stopPropagation();
          if (this.isOpen) {
            this.closeList();
          } else {
            this.openList();
          }
        });
      }

      // listen for clicks outside of combobox
      document.addEventListener('click', (e) => {
        const isOrWithin = isWithin(e.target, [this.input, this.list], true);
        if (!isOrWithin && this.isOpen) { this.closeList(); }
      });
    }

    this.optionEvents();
    this.initKeys();
  }

  getOptIndex() {
    return this.currentOption && this.currentOpts.indexOf(this.currentOption);
  }

  optionEvents() {
    this.cachedOpts.forEach((option) => {
      // The event should not be added again for already selected options and existing options
      if (!this.optionsWithEventHandlers.has(option.id) && !this.selected.includes(option)) {
        option.addEventListener('click', () => {
          this
            .goTo(this.currentOpts.indexOf(option))
            .select();
        });

        option.addEventListener('mouseover', () => {
          // clean up
          const prev = this.currentOption;
          if (prev) { Classlist(prev).remove(this.config.activeClass); }
          Classlist(option).add(this.config.activeClass);
          this.isHovering = true;
        });

        option.addEventListener('mouseout', () => {
          Classlist(option).remove(this.config.activeClass);
          this.isHovering = false;
        });
        this.optionsWithEventHandlers.add(option.id);
      }
    });
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

    if (selectText) { this.input.select(); }
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
    if ( isRepeatedLetter && matches.length > 1) {
      return this.currentOpts.indexOf(matches[matchIndex + 1] || matches[0]);
    }

    if (matchIndex !== -1 && matchIndex < matches.length - 1) {
      return this.currentOpts.indexOf(matches[0]);
    }

    return this.currentOpts.indexOf(matches[matchIndex + 1] || matches[0]);
  }

  clearFilters() {
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

  select() {
    const currentOpt = this.currentOption;
    if (!currentOpt) { return; }

    if (!this.config.multiselect && this.selected.length) { // clean up previously selected
      Classlist(this.selected[0]).remove(this.config.selectedClass)
    }

    const idx = this.selected.indexOf(currentOpt);
    const wasSelected = idx > -1;

    // Multiselect option
    if (this.config.multiselect) {
      // If option is in array and gets clicked, remove it
      if (wasSelected) {
        this.selected.splice(idx, 1);
      } else {
        this.selected.push(currentOpt);
      }
    } else {
      this.selected = this.config.allowEmpty && wasSelected
        ? []
        : [currentOpt]
    }

    // manage aria-selected
    this.cachedOpts.forEach((o) => {
      o.setAttribute('aria-selected', this.selected.indexOf(o) > -1 ? 'true' : 'false');
    });

    if (wasSelected) {
      currentOpt.classList.remove(this.config.selectedClass);
      this.emit('deselection', { text: this.input.value, option: currentOpt });
    } else {
      currentOpt.classList.add(this.config.selectedClass)
      this.emit('selection', { text: this.input.value, option: currentOpt });
    }

    this.freshSelection = true;

    const value = this.selected.length
      ? this.config.selectionValue(this.selected)
      : '';
    if (this.config.selectOnly) {
      this.input.innerText = value;
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
        console.log('selecting');
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
    this.input.value = '';
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
    this.currentOpts.forEach((opt) => {
      if (opt.classList.contains(this.config.activeClass) && !inView(this.list, opt)) {
        scrollToElement(opt);
      }
    });

    return this;
  }

  pseudoFocus(groupChanged) {
    const option = this.currentOption;
    const activeClass = this.config.activeClass;
    const prevId = this.input.getAttribute('data-active-option');
    const prev = prevId && document.getElementById(prevId);

    // clean up
    if (prev && activeClass) {
      Classlist(prev).remove(activeClass);
    }

    if (option) {
      this.input.setAttribute('data-active-option', option.id);
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

      this.input.setAttribute('aria-activedescendant', option.id);
      this.currentOption = option;
      this.emit('change');
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

  transformSelectElement(selectElement) {
  
    // Create the wrapping div element
    const comboElement = document.createElement('div');
    comboElement.className = this.config.wrapClass;
    comboElement.id = `${selectElement.id}-combobo`;

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
      if (child.tagName.toLowerCase() === 'optgroup') {
        hasOptgroup = true;
        const optgroup = document.createElement('div');
        optgroup.className = this.config.optgroupClass;
        optgroup.setAttribute('role', 'group');
        const groupId = rndid();
        optgroup.setAttribute('aria-labelledby', groupId);
  
        const label = document.createElement('div');
        label.className = this.config.optgroupLabelClass;
        label.id = groupId;
        label.textContent = child.label;
        optgroup.appendChild(label);
  
        Array.from(child.children).forEach(option => {
          const data = {
            text: option.textContent,
            value: option.value,
            selected: option.hasAttribute('selected'),
            disabled: option.hasAttribute('disabled')
          }
          optgroup.appendChild(this.createOptionElement(data.text, data.value, data.selected, data.disabled));
        });
  
        listbox.appendChild(optgroup);
      } else {
        // In case there are direct options without a group
        const data = {
          text: child.textContent,
          value: child.value,
          selected: child.hasAttribute('selected'),
          disabled: child.hasAttribute('disabled')
        }
        listbox.appendChild(this.createOptionElement(data.text, data.value, data.selected, data.disabled));
      }
    });

    if (hasOptgroup) {
      comboElement.classList.add('has-groups');
    }
      
    return {comboElement, input};
  }

  createOptionElement(text, value, selected, disabled) {
    const opt = document.createElement('div');
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

  createOptgroupElement(text) {
    const optgroup = document.createElement('div');
    optgroup.className = this.config.optgroupClass;
    optgroup.setAttribute('role', 'group');
    const groupId = rndid();
    optgroup.setAttribute('aria-labelledby', groupId);

    const label = document.createElement('div');
    label.className = this.config.optgroupLabelClass;
    label.id = groupId;
    label.textContent = text;
    optgroup.appendChild(label);
    return optgroup;
  }
};

/**
 * NOTE:
 * - https://www.w3.org/TR/2016/WD-wai-aria-practices-1.1-20160317/#combobox
 *    - "For each combobox pattern the button need not be in the tab order if there
 *    is an appropriate keystroke associated with the input element such that when
 *    focus is on the input, the keystroke triggers display of the associated drop
 *    down list."
 */
