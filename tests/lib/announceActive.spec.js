import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import Fixture from '../fixture';
import Combobo from '../../index';
import aa from '../../lib/announce-active';

const simpleSnippet = `
<section class="bands">
  <div class="wrp">
    <h2>Single select</h2>
    <label for="combobox-single">Choose Band</label>
    <div class="combo-wrap">
      <input
        type="text"
        class="combobox"
        id="combobox-single"
      />
      <span
        aria-hidden="true"
        class="trigger"
        data-trigger="single"
      ></span>
      <div
        class="listbox"
        id="simple-listbox"
      >
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

describe('lib/announce-active', () => {
  let fixture, simpleBox;

  beforeEach(() => {
    fixture = new Fixture();
    fixture.create(simpleSnippet);
    simpleBox = new Combobo({
      input: '#combobox-single',
      list: '#simple-listbox',
    });
  });

  afterEach(() => {
    if (fixture) {
      fixture.cleanUp();
      fixture.destroy();
    }
  });

  it('should be a function', () => {
    expect(typeof aa).toBe('function');
  });

  describe('given a falsey groupChanged', () => {
    it('should invoke announce with the proper arguments', () => {
      let msg, time;
      const opt = simpleBox.cachedOpts[0];
      const text = opt.innerText;

      aa(
        simpleBox.cachedOpts[0],
        simpleBox.config,
        (text, m) => {
          msg = text;
          time = m;
        },
        false
      );

      expect(msg).toBe(text);
      expect(time).toBe(500);
    });
  });

  describe('given a truthy groupChanged, config announcement groupChange', () => {
    it('should properly prepend the groupChange text to the announcement', () => {
      let msg;
      const opt = simpleBox.cachedOpts[0];
      const text = opt.innerText;
      const groupChangeText = 'group change';

      aa(
        simpleBox.cachedOpts[0],
        {
          announcement: {
            selected: '',
            groupChange: () => groupChangeText,
          },
        },
        (text) => {
          msg = text;
        },
        true
      );

      expect(msg).toBe(`${groupChangeText} ${text}`);
    });
  });

  describe('given a truthy selected', () => {
    it('should append the proper selected text to the message', () => {
      let msg;
      const opt = simpleBox.cachedOpts[0];
      const text = opt.innerText;
      const selectedText = 'foo';

      opt.setAttribute('aria-selected', 'true');

      aa(
        simpleBox.cachedOpts[0],
        {
          announcement: { selected: selectedText },
        },
        (text) => {
          msg = text;
        },
        false
      );

      expect(msg).toBe(`${text} ${selectedText}`);
    });
  });
});
