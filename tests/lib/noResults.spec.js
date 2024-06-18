import { describe, it, expect } from 'vitest';
import noResults from '../../lib/no-results';

describe('lib/no-results', () => {
  describe('given noResultsText, no currentOpts and no no-results element', () => {
    it('should create the proper element and append it to the list', () => {
      const list = document.createElement('div');
      noResults(list, [], 'NOPE!');
      const nr = list.querySelector('.combobo-no-results');
      expect(!!nr).toBe(true);
      expect(nr.innerHTML).toBe('NOPE!');
    });
  });

  describe('given current options and an existing noResults element', () => {
    it('should remove the noResults element', () => {
      const list = document.createElement('div');
      const nrDiv = document.createElement('div');
      nrDiv.className = 'combobo-no-results';
      list.appendChild(nrDiv);
      noResults(list, [1, 2, 3]);
      expect(list.childElementCount).toBe(0);
    });
  });
});
