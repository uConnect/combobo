'use strict';

import keymap from './keymap';

/**
 * attach
 * @param  {String} eventType the type of keyboard event to be attached
 * @param  {HTMLElement} target    the desired target
 * @param  {Object} config    An array of keys / callbacks
 */
export const attach = (eventType, target, config) => {
  if (typeof config === 'function') {
    return target.addEventListener(eventType, config);
  }
  if (!config || !config.length) { return; }
  target.addEventListener(eventType, (e) => {
    const keyName = keymap[e.which];

    config.forEach((c) => {
      if (c.keys.indexOf(keyName) > -1) {
        if (c.preventDefault) { e.preventDefault(); }
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

export const up = (el, config) => attach('keyup', el, config);
export const down  = (el, config) => attach('keydown', el, config);
export const press  = (el, config) => attach('keypress', el, config);
