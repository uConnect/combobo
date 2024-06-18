import attrs from '../../lib/attributes';
import { describe, it, expect } from 'vitest';

describe('lib/attributes', () => {
  it('should be a function', () => {
    expect(typeof attrs).toBe('function');
  });

  it('should add the right attributes', () => {
    const input = document.createElement('input');
    const list = document.createElement('ul');
    const options = [document.createElement('div')];

    attrs(input, list, options);

    expect(list.id).toBeTruthy();
    expect(input.getAttribute('role')).toBe('combobox');
    expect(list.getAttribute('role')).toBe('listbox');
    expect(input.getAttribute('aria-controls')).toBe(list.id);
    expect(input.getAttribute('aria-autocomplete')).toBe('list');
    expect(input.getAttribute('aria-expanded')).toBe('false');

    options.forEach((opt) => {
      expect(opt.getAttribute('role')).toBe('option');
      expect(opt.id).toBeTruthy();
    });
  });
});
