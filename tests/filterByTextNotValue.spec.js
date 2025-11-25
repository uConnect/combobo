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

const selectWithDataValues = `
<select id="test-select-values" class="combobox">
  <option value="">Choose an option</option>
  <optgroup label="Career Skills">
    <option value="60">Explore Your Interests</option>
    <option value="61">Create a Resume</option>
    <option value="62">Prepare for an Interview</option>
  </optgroup>
  <optgroup label="Career Pathways">
    <option value="68">Agriculture</option>
    <option value="70">Arts &amp; Entertainment</option>
    <option value="72">Education</option>
  </optgroup>
</select>
`;

describe('filtering by text content (not data-value)', () => {
  let fixture;
  let combobo;

  beforeAll(() => {
    fixture = new Fixture();
  });

  beforeEach(() => {
    fixture.create(selectWithDataValues);

    combobo = new Combobo({
      select: '#test-select-values',
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

  it('should filter by visible text, not data-value attribute', () => {
    const input = combobo.input;
    
    // Type 'resume' - should match "Create a Resume" (value="61")
    // Also matches "Explore Your Interests" because "Interests" contains "res"
    input.value = 'resume';
    combobo.filter();

    expect(combobo.currentOpts.length).toBe(1);
    expect(combobo.currentOpts[0].textContent.trim()).toBe('Create a Resume');
    expect(combobo.currentOpts[0].dataset.value).toBe('61');
  });

  it('should filter "art" and match "Arts & Entertainment"', () => {
    const input = combobo.input;

    // Type 'art' - should match "Arts & Entertainment" (value="70")
    input.value = 'art';
    combobo.filter();

    expect(combobo.currentOpts.length).toBe(1);
    expect(combobo.currentOpts[0].textContent.trim()).toBe('Arts & Entertainment');
    expect(combobo.currentOpts[0].dataset.value).toBe('70');
  });

  it('should not match by numeric data-value', () => {
    const input = combobo.input;

    // Type '60' - should NOT match any options by their data-value (unless the visible text contains '60')
    input.value = '60';
    combobo.filter();

    expect(combobo.currentOpts.length).toBe(0);
  });

  it('should filter across multiple optgroups', () => {
    const input = combobo.input;
    
    // Type 'e' - should match "Explore", "Create", "Prepare", "Interview", "Agriculture", "Entertainment", "Education"
    input.value = 'e';
    combobo.filter();

    expect(combobo.currentOpts.length).toBeGreaterThan(3);

    // Verify it includes options from both groups
    const texts = combobo.currentOpts.map(opt => opt.textContent.trim());
    expect(texts).toContain('Explore Your Interests');
    expect(texts).toContain('Education');
  });
});
