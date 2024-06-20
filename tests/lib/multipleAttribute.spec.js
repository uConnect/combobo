import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from 'vitest';
import Fixture from '../fixture';
import { queryAll } from '../../lib/utils/select';
import Combobo from '../../index';

const simpleSnippet = `
<section class="bands">
  <div class="wrp">
    <select class="combobo" multiple>
      <option>Red</option>
      <option>Yellow</option>
    </select>
  </div>
  <button type="button">Submit</button>
</section>
`;

describe('Initializing from select with multiple attribute', () => {
  let fixture, simpleBox, opts;

  beforeAll(() => {
    fixture = new Fixture();
  });

  beforeEach(() => {
    fixture.create(simpleSnippet);
    simpleBox = new Combobo({ multiselect: false });
    opts = queryAll('.combobo option', fixture.element);
  });

  afterEach(() => {
    fixture.destroy();
  });

  afterAll(() => {
    if (fixture) {
      fixture.cleanUp();
    }
  });

  it('should assert the options in the list', () => {
    const options = opts.map((opt) => opt.innerText);
    expect(options).toEqual(['Red', 'Yellow']);
  });

  it('should select the first option from the list', () => {
    simpleBox.goTo(simpleBox.getOptIndex() + 0).select();
    const expectedValue = 'Red';
    const selectedValue = simpleBox.value();

    if (Array.isArray(selectedValue)) {
      expect(selectedValue[0]).toBe(expectedValue);
    } else {
      expect(selectedValue).toBe(expectedValue);
    }
  });

  it('should select the second option from the list', () => {
    simpleBox.goTo(simpleBox.getOptIndex() + 1).select();
    const expectedValue = 'Yellow';
    const selectedValue = simpleBox.value();

    if (Array.isArray(selectedValue)) {
      expect(selectedValue[0]).toBe(expectedValue);
    } else {
      expect(selectedValue).toBe(expectedValue);
    }
  });
});
