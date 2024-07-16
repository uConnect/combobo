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

const selectMultiple = `
<input type="text" class="combobox" id="combobox-multiselect-with-groups">
<span aria-hidden="true" class="trigger" data-trigger="multiselect-with-groups"></span>
<div class="listbox">
  <div class="optgroup" role="group" aria-labelledby="color">
    <div class="optgroup-label" id="color">Color</div>
    <div class="option">Black</div>
    <div class="option">Blue</div>
    <div class="option">Green</div>
    <div class="option">Red</div>
    <div class="option">White</div>
  </div>
  <div class="optgroup" role="group" aria-labelledby="make">
    <div class="optgroup-label" id="make">Make</div>
    <div class="option">Chrysler</div>
    <div class="option">Ford</div>
    <div class="option">GM</div>
  </div>
  <div class="optgroup" role="group" aria-labelledby="transmission">
    <div class="optgroup-label" id="transmission">Transmission</div>
    <div class="option">Automatic</div>
    <div class="option">Manual</div>
  </div>
</div>
`;

describe('select multiple', () => {
  let fixture;
  let combobo;

  beforeAll(() => {
    fixture = new Fixture();
  });

  beforeEach(() => {
    fixture.create(selectMultiple);

    combobo = new Combobo({
      input: '#combobox-multiselect-with-groups',
      list: '.listbox',
      multiselect: true,
      groups: '.optgroup',
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

  it('should not be null', () => {
    expect(combobo).to.not.be.null;
  });

  it('should select multiple options', () => {
    combobo.goTo(combobo.getOptIndex() + 2).select();
    combobo.goTo(combobo.getOptIndex() + 3).select();
    combobo.goTo(combobo.getOptIndex() + 4).select();

    expect(combobo.value()).to.deep.equal(['Green', 'Chrysler', 'Manual']);
  });

  it('should clear the options selected', () => {
    combobo.goTo(combobo.getOptIndex() + 2).select();
    combobo.goTo(combobo.getOptIndex() + 3).select();
    combobo.goTo(combobo.getOptIndex() + 4).select();

    combobo.clearOptions();

    expect(combobo.value()).eql([]);
  });
});
