import { describe, it, expect } from 'vitest';
import currentGroup from '../../lib/current-group';

describe('lib/current-group', () => {
  it('should be a function', () => {
    expect(typeof currentGroup).toBe('function');
  });

  it('should return the proper group', () => {
    const g = document.createElement('div');
    const opt = document.createElement('div');
    g.appendChild(opt);
    const groups = [
      { options: [document.createElement('div')] },
      { element: g, options: [opt] },
    ];
    const current = currentGroup(groups, opt);
    expect(current.element).toBe(g);
    expect(current.options.length).toBe(1);
    expect(current.options[0]).toBe(opt);
  });
});
