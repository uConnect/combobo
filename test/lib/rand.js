'use strict';

const assert = require('chai').assert;
const rndid = require('../../lib/utils/rndid');

describe('lib/utils/rndid', () => {
  it('should generate a random 8-character id', () => {
    const generatedID = rndid();

    assert.equal(generatedID.length, 8);
  });

  it('should not be null', () => {
    const generatedID = rndid();

    assert.isNotNull(generatedID);
  });

  it('should be unique', () => {
    const generatedID = rndid();

    const generatedSecondID = rndid();

    assert.notStrictEqual(generatedID, generatedSecondID);
  });

  it('should start with a letter', () => {
    const generatedID = rndid();

    const startsWithLetterRegex = /^[A-Za-z]/;

    assert.match(
      generatedID,
      startsWithLetterRegex,
      `'${generatedID}' does not start with a letter`
    );
  });
});
