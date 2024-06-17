import { describe, it, expect } from 'vitest';
import value from '../../lib/value';

describe('lib/value', () => {
  it('should support data-value attribute (as the 1st priority)', () => {
    const div = document.createElement('div');
    div.setAttribute('data-value', 'cats');
    div.innerHTML = 'dogs';
    expect(value(div)).toBe('cats');
  });

  it('should support innerText (as the 2nd priority)', () => {
    const div = document.createElement('div');
    div.innerHTML = 'dogs';
    expect(value(div)).toBe('dogs');
  });
});
