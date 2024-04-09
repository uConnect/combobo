'use strict';

const assert = require('chai').assert;
const Fixture = require('../fixture');
const queryAll = require('../../lib/utils/select').all;
const simpleSnippet = require('../snippets/multiple.html');
const Combobo = require('../../index');

describe('Initializing from select with multiple attribute', () => {
  let fixture, simpleBox, opts;

  before(() => (fixture = new Fixture()));
  beforeEach(() => {
    fixture.create(`${simpleSnippet}`);
    // The select element has a 'multiple' attribute that overrides the 'multiselect' configuration.
    // It initializes as a multi-select even if 'multiselect' is set to false.
    simpleBox = new Combobo({ multiselect: false });
    opts = queryAll('.combobo option', fixture.element);
  });
  afterEach(() => fixture.destroy());
  after(() => fixture.cleanUp());

  it('should assert the options in the list', () => {
    const options = opts.map((opt) => opt.innerText);
    assert.deepEqual(options, ['Red', 'Yellow']);
  });

  it('should select the first option from the list', () => {
    simpleBox.goTo(simpleBox.getOptIndex() + 0).select();
    const expectedValue = 'Red';

    assert.equal(
      simpleBox.value(),
      expectedValue,
      `Selected value should be '${expectedValue}'`
    );
  });

  it('should select the second option from the list', () => {
    simpleBox.goTo(simpleBox.getOptIndex() + 1).select();
    const expectedValue = 'Yellow';

    assert.equal(
      simpleBox.value(),
      expectedValue,
      `Selected value should be '${expectedValue}'`
    );
  });
});
