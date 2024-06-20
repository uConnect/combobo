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
import filters from '../../lib/filters';

const simpleSnippet = `
<section class="bands">
  <div class="wrp">
    <h2>Single select</h2>
    <label for="combobox-single">Choose Band</label>
    <div class="combo-wrap">
      <input type="text" class="combobox" id="combobox-single">
      <span aria-hidden="true" class="trigger" data-trigger="single"></span>
      <div class="listbox" id="simple-listbox">
        <div class="option">Ween</div>
        <div class="option">Frank Zappa</div>
        <div class="option">Snarky Puppy</div>
        <div class="option">Umphrey's McGee</div>
        <div class="option">Keller Williams</div>
        <div class="option">Greensky Bluegrass</div>
        <div class="option">Leftover Salmon</div>
        <div class="option">Moe.</div>
        <div class="option">Family Groove Company</div>
        <div class="option">Mac Demarco</div>
        <div class="option">Lettuce</div>
      </div>
    </div>
  </div>
  <button type="button">Submit</button>
</section>
  `;

describe('lib/filter', () => {
  let fixture, opts;

  beforeAll(() => {
    fixture = new Fixture();
  });

  beforeEach(() => {
    fixture.create(simpleSnippet);
    opts = queryAll('.option', fixture.element);
  });

  afterEach(() => {
    fixture.destroy();
  });

  afterAll(() => {
    fixture.cleanUp();
  });

  describe('contains', () => {
    it('should properly filter the options', () => {
      const filtered = filters.contains('een', opts);
      const texts = filtered.map((opt) => opt.innerText);
      expect(filtered.length).toBe(2);
      expect(texts).toEqual(['Ween', 'Greensky Bluegrass']);
    });
  });

  describe('equals', () => {
    it('should properly filter the options', () => {
      const filtered = filters.equals('Moe', opts);
      expect(filtered.length).toBe(0);
      const text = 'Moe.';
      const otherFiltered = filters.equals(text, opts);
      expect(otherFiltered.length).toBe(1);
      expect(otherFiltered[0].innerText).toBe(text);
    });
  });

  describe('starts-with', () => {
    it('should properly filter the options', () => {
      const filtered = filters['starts-with']('le', opts);
      const texts = filtered.map((opt) => opt.innerText);
      expect(filtered.length).toBe(2);
      expect(texts).toEqual(['Leftover Salmon', 'Lettuce']);
    });
  });
});
