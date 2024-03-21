'use strict';

const assert = require('chai').assert;
const rndid = require('../../lib/utils/rndid');

describe('lib/utils/rndid', () => {
  it('should generate a random id defaults to 8', () => {
    const a = rndid();
    assert.equal(a.length, 8);
  });

  it('should not be null', () => {
    const a = rndid();
    assert.isNotNull(a);
  });

  it('should be unique', () => {
    const a = rndid();
    const b = rndid();

    assert.notStrictEqual(a, b);
  });
});
