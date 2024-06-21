import { describe, it, expect } from 'vitest';
import wrapMatch from '../../lib/utils/wrap-match';

describe('lib/utils/wrap-match', () => {
  it('should properly wrap the match', () => {
    const opt = document.createElement('div');
    const input = document.createElement('input');
    input.value = 'oog';
    opt.innerHTML = 'boognish';
    const html = wrapMatch(opt, input.value, 'accent');

    expect(html).toBe('b<span class="accent">oog</span>nish');
  });
});
