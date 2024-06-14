import { describe, it, expect } from 'vitest';
import config from '../../lib/config';

describe('lib/config', () => {
  it('should be a function', () => {
    expect(typeof config).toBe('function');
  });

  it('should properly merge the userConfig with the defaults', () => {
    const configuration = config({
      announcement: {
        count: 7,
      },
      multiselect: true,
      input: 'blahblah',
      noResultsText: 7,
    });

    expect(configuration.input).toBe('blahblah');
    expect(configuration.list).toBe('.listbox');
    expect(configuration.options).toBe('.option');
    expect(configuration.groups).toBe(null);
    expect(configuration.openClass).toBe('open');
    expect(configuration.activeClass).toBe('active');
    expect(configuration.announcement.count).toBe(7);
    expect(configuration.announcement.selected).toBe('Selected.');
    expect(configuration.noResultsText).toBe(7);
    expect(configuration.autoFilter).toBe(true);
  });
});
