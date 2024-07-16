import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from 'vitest';

import Fixture from './fixture';
import Combobo from '../index';
import { queryAll } from '../lib/utils/select';

const selectOnlySnippetHTML = `
<div class="example-card select-only-as-input">
  <div class="card-content">
    <h3>Initiated on <code>&lt;input&gt;</code></h3>
    <label for="combobox-select-only-as-input">Month</label>
    <div class="combo-wrap">
      <input type="text" class="combobox" id="combobox-select-only-as-input" aria-expanded="false">
      <span aria-hidden="true" class="trigger" data-trigger="select-only-as-input"></span>
      <div class="listbox">
        <div class="option">January</div>
        <div class="option">February</div>
        <div class="option">March</div>
        <div class="option">April</div>
        <div class="option">May</div>
        <div class="option">June</div>
        <div class="option">July</div>
        <div class="option">August</div>
        <div class="option">September</div>
        <div class="option">October</div>
        <div class="option">November</div>
        <div class="option">December</div>
      </div>
    </div>
    <button type="button">Submit</button>
  </div>
</div>
`;

describe('select-only', () => {
  let fixture;
  let selectOnly;
  let opts;

  beforeAll(() => {
    fixture = new Fixture();
  });

  beforeEach(() => {
    fixture.create(selectOnlySnippetHTML);

    selectOnly = new Combobo({
      input: '#combobox-select-only-as-input',
      list: '.listbox',
      options: '.option',
      selectOnly: true,
    });

    opts = queryAll('.listbox .option', fixture.element);
  });

  afterEach(() => {
    fixture.destroy();
  });

  afterAll(() => {
    if (fixture) {
      fixture.cleanUp();
    }
  });

  it('should not be undefined', () => {
    expect(selectOnly.goTo(1).select()).not.toBeUndefined();
  });

  it('should select an element', () => {
    selectOnly.goTo(2).select();

    let selectedValue = selectOnly.value();

    expect(selectedValue).toBe('March');
  });

  it('should reset the selection', () => {
    selectOnly.goTo(2).select();

    let selectedValue = selectOnly.value();
    selectOnly.reset();
    selectedValue = selectOnly.value();

    expect(selectedValue).toBe(null);
  });
});
