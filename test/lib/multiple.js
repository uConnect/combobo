'use strict';

const assert = require('chai').assert;
const queryAll = require('../../lib/utils/select').all;
const aa = require('../../lib/announce-active');
const multiSelectOptions = require('../../lib/multiSelectOptions');
const Fixture = require('../fixture');
const simpleSnippet = require('../snippets/multiple.html');
const Combobo = require('../../index');

describe('multiselect config', () => {
  let fixture, simpleBox, opts;

  before(() => (fixture = new Fixture()));
  beforeEach(() => {
    fixture.create(`${simpleSnippet}`);
    simpleBox = new Combobo({ multiselect: false });
    opts = queryAll('.combobo option', fixture.element);
  });
  afterEach(() => fixture.destroy());
  after(() => fixture.cleanUp());

  it('should be a function', () => {
    assert.equal('function', typeof aa);
    assert.equal('function', typeof multiSelectOptions);
  });

  it('should return the options set in the dropdown', () => {
    const options = opts.map((opt) => opt.innerText);
    assert.deepEqual(options, ['Red', 'Yellow']);
  });

  it('should return the dropdown option set', () => {
    let msg;

    var yellowOption = Array.prototype.find.call(
      simpleBox.cachedOpts,
      function (opt) {
        return opt.textContent.trim() === 'Yellow';
      }
    );

    yellowOption.setAttribute('aria-selected', 'true');
    simpleBox.selectedOpts = [yellowOption];

    aa(
      yellowOption,
      {
        announcement: { selected: 'Yellow' },
      },
      function (text) {
        msg = text;
      },
      false
    );

    assert.equal(
      msg,
      'Yellow Yellow',
      'The message does not correctly reflect the "Yellow" selection'
    );
  });

  it('should return the selected two options', () => {
    let msg;

    const redOption = opts.find((option) => option.innerText.trim() === 'Red');
    const yellowOption = opts.find(
      (option) => option.innerText.trim() === 'Yellow'
    );

    redOption.setAttribute('aria-selected', 'true');
    yellowOption.setAttribute('aria-selected', 'true');

    multiSelectOptions(
      opts[0],
      {
        announcement: { selected: '' },
      },
      function (text) {
        msg = text.trim();
      },
      false,
      fixture.element
    );

    const expectedMsg = 'Red Yellow';

    assert.equal(
      msg,
      expectedMsg,
      'The message does not correctly announce the selected options'
    );
  });
});
