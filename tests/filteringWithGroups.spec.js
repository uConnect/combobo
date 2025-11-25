import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from 'vitest';
import Combobo from '../index';
import Fixture from './fixture';

const comboboxWithGroups = `
<input type="text" class="combobox" id="combobox-with-groups">
<span aria-hidden="true" class="trigger"></span>
<div class="listbox">
  <div class="option">Top Level Option</div>
  <div class="optgroup" role="group" aria-labelledby="fruits">
    <div class="optgroup-label" id="fruits">Fruits</div>
    <div class="option">Apple</div>
    <div class="option">Banana</div>
    <div class="option">Cherry</div>
  </div>
  <div class="optgroup" role="group" aria-labelledby="vegetables">
    <div class="optgroup-label" id="vegetables">Vegetables</div>
    <div class="option">Carrot</div>
    <div class="option">Celery</div>
    <div class="option">Cucumber</div>
  </div>
</div>
`;

describe('filtering with optgroups', () => {
  let fixture;
  let combobo;

  beforeAll(() => {
    fixture = new Fixture();
  });

  beforeEach(() => {
    fixture.create(comboboxWithGroups);

    combobo = new Combobo({
      input: '#combobox-with-groups',
      list: '.listbox',
      options: '.option',
      groups: '.optgroup',
      selectOnly: false,
      filter: 'contains',
      noResultsText: 'No results found.',
    });
  });

  afterEach(() => {
    fixture.destroy();
  });

  afterAll(() => {
    if (fixture) {
      fixture.cleanUp();
    }
  });

  it('should filter options from both top-level and optgroups', () => {
    combobo.input.value = 'c';
    combobo.filter();

    // Should match: Cherry, Carrot, Celery, Cucumber
    expect(combobo.currentOpts.length).toBe(4);
    
    // All matching options should be visible (not have display: none)
    const visibleOpts = combobo.currentOpts.filter(opt => opt.style.display !== 'none');
    expect(visibleOpts.length).toBe(4);
  });

  it('should show matching options from optgroups when typing', () => {
    combobo.input.value = 'app';
    combobo.filter();

    // Should match: Apple
    expect(combobo.currentOpts.length).toBe(1);
    expect(combobo.currentOpts[0].textContent).toBe('Apple');

    // The matched option should be visible
    expect(combobo.currentOpts[0].style.display).not.toBe('none');
  });

  it('should hide groups with no matching options', () => {
    combobo.input.value = 'car';
    combobo.filter();

    // Should match: Carrot
    expect(combobo.currentOpts.length).toBe(1);

    // Find the vegetables group (should be visible)
    const vegGroup = combobo.groups.find(g => g.element.querySelector('#vegetables'));
    expect(vegGroup.element.style.display).not.toBe('none');

    // Find the fruits group (should be hidden)
    const fruitGroup = combobo.groups.find(g => g.element.querySelector('#fruits'));
    expect(fruitGroup.element.style.display).toBe('none');
  });

  it('should show all options when input is cleared', () => {
    combobo.input.value = 'xyz';
    combobo.filter();

    // No matches
    expect(combobo.currentOpts.length).toBe(0);

    // Clear input
    combobo.input.value = '';
    combobo.clearFilters();

    // All options should be visible again
    expect(combobo.currentOpts.length).toBe(combobo.cachedOpts.length);
    const visibleOpts = combobo.cachedOpts.filter(opt => opt.style.display !== 'none');
    expect(visibleOpts.length).toBe(combobo.cachedOpts.length);
  });
});
