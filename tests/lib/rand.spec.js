import { expect, describe, it } from 'vitest';
import rndid from '../../lib/utils/rndid';

describe('lib/utils/rndid', () => {
  it('should generate a random 8-character id', () => {
    const generatedID = rndid();

    expect(generatedID.length).toBe(8);
  });

  it('should not be null', () => {
    const generatedID = rndid();

    expect(generatedID).not.toBeNull();
  });

  it('should be unique', () => {
    const generatedID = rndid();
    const generatedSecondID = rndid();

    expect(generatedID).not.toBe(generatedSecondID);
  });

  it('should start with a letter', () => {
    const generatedID = rndid();
    const startsWithLetterRegex = /^[A-Za-z]/;

    expect(generatedID).toMatch(startsWithLetterRegex);
  });
});
