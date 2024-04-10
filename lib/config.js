'use strict';

import extend from 'extend-shallow';

/**
 * The default config for Combobo
 * @type {Object}
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
  selectionValue: (selecteds) => selecteds.map((s) => s.innerText.trim()).join(' - '),
  optionValue: (option) => option.innerHTML,
  announcement: {
    count: (n) => `${n} options available`,
    selected: 'Selected.'
  },
  filter: 'contains', // 'starts-with', 'equals', or funk
  autoFilter: true, // will enable filter options on front-end
  selectOnly: false,
  selectSearchTimeout: 500, // Milliseconds; only relevant if `selectOnly` is `true`
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
