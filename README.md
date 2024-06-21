# Combobo

Accessible combobox module

## Installation

### In the HTML
Just include `combobo.js` (`window.Combobo` will be set)

```html
  <script src="./node_modules/combobo/dist/combobo.js"></script>
```

#### CDN (unpkg)

```html
<script src="https://unpkg.com/combobo"></script>
```


### With browserify/webpack/any bundler
```bash
$ npm install combobo
```

```js
import Combobo from 'combobo'; // or require('combobo')
```

## Usage

```js
const combobo = new Combobo();
```

There are two ways to initialize Combobo comboboxes:

### 1. From a Select Element

Transform a standard HTML `select` element into an accessible combobox.
This allows you to initialize Combobo directly on a `<select>` element, automatically transforming it into an enhanced combobox.

```html
  <select class="combobo">
    <optgroup label="Primary Colors">
      <option>Blue</option>
      <option>Red</option>
      <option>Yellow</option>
    </optgroup>
    <optgroup label="Secondary Colors">
      <option>Green</option>
      <option>Orange</option>
      <option>Purple</option>
    </optgroup>
  </select>
```

### 2. From Required HTML Elements for Combobo

Manually create the required HTML structure for a Combobo combobox.

```html
<div class="combo-wrap">
  <input type="text" class="combobox">
  <span aria-hidden="true" class="trigger"></span>
  <div class="listbox">
    <div class="optgroup" role="group" aria-labelledby="primary-colors">
      <div class="optgroup-label" id="primary-colors">Primary Colors</div>
      <div class="option selected">Blue</div>
      <div class="option">Red</div>
      <div class="option">Yellow</div>
    </div>
    <div class="optgroup" role="group" aria-labelledby="secondary-colors">
      <div class="optgroup-label" id="secondary-colors">Secondary Colors</div>
      <div class="option">Green</div>
      <div class="option">Orange</div>
      <div class="option">Purple</div>
    </div>
  </div>
</div>
```

Note: In order to dynamically add options and group items, you could set the `source` configuration to specify the data object that will be used to create the groups and options.

## Options

### Selectors

To initialize from `select` element
* `select` (_HTMLElement|String_): The selector for the select element or the select element reference.
  * Defaults to `select.combobo`

To initialize from Required HTML Elements
* `input` (_HTMLElement|String_): The selector for the input (combobox) element or the input element reference.
  * Defaults to `.combobox`
* `list` (_HTMLElement|String_): The selector for the list element or the list element reference. (to be qualified within the parent of input element)
  * Defaults to `.listbox`
* `toggleButton` (_HTMLElement|String_): The selector for the toggle button element or the reference to it. (to be qualified within the parent of input element)
  * Defaults to `.trigger`
* `options` (_Array|String_): An array of HTMLElements or a string selector (to be qualified within the list element).
  * Defaults to `.option`
* `groups` (_Array|String_): An array of HTMLElements or a string selector (to be qualified within the list element)

### Data Source
* `source` (_Array_) Optional: An array of data that will be used to generate the options in the dropdown. The `source` array can include objects representing either individual options or groups of options (optgroups).

  #### Sample Data Options
  ```javascript
  const dataSource = [
    { label: 'Select an Option', value: '', selected: true , disabled: true  },
    { label: 'Option 1', value: '1', className: 'custom-class' },
    {
      label: 'Group',
      options: [
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3'}
      ]
    }
  ];

### Class names
* `openClass` (_String_): Class name that gets added when list is open.
  * Defaults to `open`
* `activeClass` (_String_): Class name that gets added when active is triggered
  * Defaults to `active`
* `selectedClass` (_String_): Class name that gets added when list item is selected
  * Defaults to `selectedClass`

The class added below will be applied to the corresponding elements during the transformation of the `<select>` element into an enhanced combobox.
* `wrapClass` (String): Class name for the wrapper of the combobox.
  * Defaults to `combo-wrap`.
* `inputClass` (String): Class name for the input element.
  * Defaults to `combobox`.
* `listClass` (String): Class name for the list element. 
  * Defaults to `listbox`.
* `toggleButtonClass` (String): Class name for the toggle button. 
  * Defaults to `trigger`.
* `optgroupClass` (String): Class name for option groups within the list.
  * Defaults to `optgroup`.
* `optgroupLabelClass` (String): Class name for labels of option groups.
  * Defaults to `optgroup-label`.
* `optionsClass` (String): Class name for options within the list.
  * Defaults to `option`.


### Other options
* `allowEmpty` (_Boolean_): If completely clear selection should be allowed (if field is required, `false` is probably what you want).
  * Defaults to `true`
* `useLiveRegion` (_Boolean_): Determines whether or not to use Live Region (due to spotty AT support, `aria-activedescendant` will be used also).  As of right now, it is recommended that you leave `useLiveRegion` on due to VoiceOver's lack of support for `aria-activedescendant`.
  * Defaults to `true`
* `multiselect` (_Boolean_): Determines whether or not to enable multiselect features. If the combobox originates from a `<select>` element, the `multiple` attribute of that element overrides this setting.
  * Defaults to `false`
* `noResultsText` (_String_): Sets text for when there are no matches
* `selectionValue` (_Function_): A function that should return what the desired value of the input should be upon selection (this is especially useful for multiselect in that you can configure custom input values like `{3 Items Selected}`). An array of the selected options is passed as the one argument to the function.
* `optionValue` (_Function|String_): A function that should return the desired markup of each option in the list (this allows for custom display of each option based on what is currently typed in the field) OR a string class that is to be added to the span that will be wrapped around the matched text in each option.
* `announcement` (_Object_): An object containing the following properties:
  * `count` (_Function_): Announcement of currently selected items in list. The function accepts 1 argument which is the number of options selected.
    * Defaults to `function (n) { return n + ' options available'; }`
  * `selected` (_String_): The desired text to be used to inform AT that an option is selected (This is only applicable if useLiveRegion is `true`)
    * Defaults to `"Selected."`
  * `groupChange` (_Function_): The desired text to be announced when a group change occurs (as a result of arrow-key traversal of options).  This is obviously only applicable if `groups` are used (see above for info on `options.groups`)
    * Example:
    ```js
      function groupChangeHandler(newGroup) {
        var groupLabel = newGroup.querySelector('.optgroup-label').innerText;
        var len = Array.prototype.slice.call(
          newGroup.querySelectorAll('.option')
        ).filter(function (opt) {
          return opt.style.display !== 'none';
        }).length;

        return groupLabel + ' group entered, with ' + len + ' options.';
      }
    ```
* `filter` (_String|Function_): A filter-type string (`'contains'`, `'starts-with'`, or `'equals'`) or a function that returns a array of filtered options.
  * Defaults to `'contains'`
  * When `selectOnly` is `true`, forced to `'starts-with'`
* `autoFilter` (_Boolean_): To enable / disable filtering options on front end. If the developer wants to filter options from the server, then it should be false
  * Defaults to `'true'`
  * When `selectOnly` is `true`, forced to `false`
* `toggleButtonIcon` (_String_): Text or HTML that gets inserted into the toggle button element.
  * Examples: `▼`, `<svg ...>`, `<i class="fa fa-chevron-down"></i>`, `<img src...>`, etc.
  * If a HTML-initialized combobox already contains text/markup and a `toggleButtonIcon` is provided, the `toggleButtonIcon` will replace the existing content.
  * Defaults to `null` (no icon inserted).
* `selectOnly` (_Boolean_): Only allows selection from the dropdown list, like a native `<select>` element. Text input is not enabled, but common keyboard behaviors (such as jumping to the first matching option when a letter is typed) are still enabled.
  * Defaults to `false`
  * `<select>`-initialized comboboxes have their `<input>` element replaced with a `<div>` element.
  * `<input>`-initialized comboboxes retain a hidden `<input>` element so that forms can be submitted with the selected value(s), but a `<div>` element is used for the visible input.
* `selectSearchTimeout` (_Number_): How long to wait before resetting the search query when the user stops typing.
  * Defaults to `500`
  * Only relevant if `selectOnly` is `true`

### Example Combobo call with options

```js
var combobo = new Combobo({
  input: '.combobox', // Or select: 'select.combobo'
  list: '.listbox',
  options: '.option', // qualified within `list`
  groups: null, // qualified within `list`
  openClass: 'open',
  activeClass: 'active',
  selectedClass: 'selected',
  useLiveRegion: true,
  multiselect: false,
  noResultsText: null,
  selectionValue: (selecteds) => selecteds.map((s) => s.innerText.trim()).join(' - '),
  optionValue: 'underline', // wrap the matched portion of the option (if applicable) in a span with class "underline"
  announcement: {
    count: (n) => `${n} options available`,
    selected: 'Selected.'
  },
  filter: 'contains' // 'starts-with', 'equals', or funk,
  autoFilter: true // 'true' or 'false' default true
});
```

Initiating Combobo will result in either a single Combobo instance or a collection of them. These instances allow for direct interaction with the comboboxes on the page.

If there is only one combobox field enhanced by this setup, when there is only one input or select element that match the selector, you will get back a single Combobo instance. You can directly interact with this instance to get or set its value, like `combobo.value()`.

If there are multiple combobox fields enhanced, you will receive an object where each Combobo instance is accessible via its ID. To interact with a specific instance, use `combobo['ID'].value()`.

Note: When initialized from the required HTML containing an input element, the ID will match the input's ID or be randomly generated if the input elements do not have an ID. If initialized from a `<select>` element, the input ID will be the ID of the `<select>` element. If the `<select>` element lacks an ID, it will also receive a random ID.

```
<select id="color"><option/><option/>....</select>
var combobo = new Combobo({select = '#color'});
// retrive selected values
combobo.value();
```

```
<select class="combobo" id="color"><option/><option/>....</select>
<select class="combobo"><option/><option/>....</select>
var combobo = new Combobo();
// Retrive selected values
combobo['combobo'].value();
combobo['GENERATED-RANDOM-ID'].value();
```

## Events
Add an event listener with `.on`, remove event listener with `.off` (see example below)
* `list:open`: Fires when the list is in an open state.
* `list:close`: Fires when the list is in a closed state.
* `deselection`: Fires when a selected element is deselected.
* `selection`: Fires when an item in the list is selected.
* `change`: Fires each time an option is made active (either through arrow key traversal or hover).

```js
var combobo = new Combobo();

combobo
  .on('change', function () {
    console.log('stuff has changed and stuff');
  })
  .on('selection', function () {
    console.log('selection made!');
  });
```

## Methods
* `value`: Returns the value(s) of selected items, as a single string or an array of strings. For options originating from a select element, this refers to the value attribute of the options. For options not based on a select element, it uses the data-value attribute of the options if available; otherwise, it defaults to the text content of the options.
* `goTo`: accepts 1 argument which is either a *String* ('prev' or 'next'), which as it sounds will navigate Combobo to the previous or next option, or the index (*Number*) of the option to be traversed to.  NOTE: This method does not select the option but rather highlights it as if the option is hovered or arrowed to.
* `select`: selects the currently highlighted option
* `getOptIndex`: returns the index (within the currently visible options) of the currently selected option.
* `reset`: clears the filters and deselects any currently selected options.
* `setOptions`: accepts 1 argument which is HTML code in *String* format. Adds one option to the existing dropdown list.
* `setNoResultFound`: shows the *No results found* in dropdown if the matching options not available
* `emptyDropdownList`: Empty the options in the dropdown list
* `updateSelectedOptions`: Empty all the options and update with selected options in the list
* `setCurrentOptions`: Sets the current Option from the current options list
* `addPlaceholder`: Adds a disabled option to the top of the Combobo
* `clearOptions`: Remove all options from the Combobo and reset the Combobo to its initial state
* `addOptions`: Add multiple options/optgroups to the Combobo; see `addOption`, `addOptGroup`
* `addOptGroup`: Add an optgroup to the Combobo
* `addOption`: Add an option to the Combobo

### Example usage

```js
// move 5 options forward and select the option
combobo
  .goTo(combobo.getOptIndex() + 5)
  .select();

// adds an option to the dropdown list
combobo
  .setOptions(`<li>Some Option</li>`);
```


# Unit Tests

This project utilizes Vitest for running tests. Vitest is a fast and efficient test runner built on top of Vite. Below are the scripts used for testing in this project.

## Scripts

### `test`

This script runs all the tests in the project using Vitest.

**Usage:**
```
npm run test
```

### `test:ui`

This script runs the tests and provides a user interface to view the test results. The UI allows for an interactive and visually enhanced experience for inspecting test outcomes.

**Usage:**
```
npm run test:ui
```

## Running Tests

### Command Line

To run the tests in the command line without the UI, use:
```bash
npm run test
```

### UI Mode

To run the tests and view the results in an interactive UI, use:
```bash
npm run test:ui
```

## Additional Resources

- [Vitest Documentation](https://vitest.dev/guide/)