'use strict';

import extend from 'extend-shallow';

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
const defaults = {
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
  selectionValue: (selecteds) => selecteds.map((s) => s.innerText.trim()).join(' - '),
  optionValue: (option) => option.innerHTML,
  announcement: {
    count: (n) => `${n} options available`,
    selected: 'Selected.'
  },
  filter: 'contains',
  autoFilter: true,
  selectOnly: false,
  selectSearchTimeout: 500,
  disabled: false,
};

/**
 * Merges user's config with defaults
 * @param  {Object} userConfig
 * @return {Object}
 */
module.exports = (userConfig) => {
  const config = {};
  const announcementConfig = {};
  // setup for announcement
  userConfig.announcement = userConfig.announcement || {};
  // merge user's announcement object with the announcement defaults
  extend(announcementConfig, defaults.announcement, userConfig.announcement);
  // merge the others...
  extend(config, defaults, userConfig);
  config.announcement = announcementConfig;

  return config;
};
