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
    <optgroup label="Color">
      <option>Red</option>
      <option>Yellow</option>
    </optgroup>
    <optgroup label="Molor">
      <option>Ddd</option>
      <option>fadfa</option>
    </optgroup>
  </select>
```

### 2. From Required HTML Elements for Combobo

Manually create the required HTML structure for a Combobo combobox.

```html
<div class="combo-wrap">
  <input type="text" class="combobox">
  <i aria-hidden="true" class="fa trigger fa-caret-down"></i>
  <div class="listbox">
    <div class="optgroup" role="group" aria-labelledby="color">
      <div class="optgroup-label" id="color">Color</div>
      <div class="option selected">Red</div>
      <div class="option">Yellow</div>
    </div>
    <div class="optgroup" role="group" aria-labelledby="motor">
      <div class="optgroup-label" id="motor">Molor</div>
      <div class="option">Ddd</div>
      <div class="option">fadfa</div>
    </div>
  </div>
</div>
```

## Options

### Selectors

To inialize from select element
* `select` (_HTMLElement|String_): The selector for the select element or the select element reference.
  * Defaults to `select.combobo`

To initialize from Required HTML Elements
* `input` (_HTMLElement|String_): The selector for the input (combobox) element or the input element reference.
  * Defaults to `.combobox`
* `list` (_HTMLElement|String_): The selector for the list element or the list element reference.
  * Defaults to `.listbox`
* `options` (_Array|String_): An array of HTMLElements or a string selector (to be qualified within the list element).
  * Defaults to `.option`
* `groups` (_Array|String_): An array of HTMLElements or a string selector (to be qualified within the list element)

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
  * Defaults to `fa trigger fa-caret-down`.
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
* `multiselect` (_Boolean_): Determines whether or not to enable multiselect features
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
* `autoFilter` (_Boolean_): To enable / disable filterng options on front end. If the developer wants to filter options from the server, then it should be false
  * Defaults to `'true'`


### Example Combobo call with options

```js
var combobo = new Combobo({
  input: '.combobox',
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
* `goTo`: accepts 1 argument which is either a *String* ('prev' or 'next'), which as it sounds will navigate Combobo to the previous or next option, or the index (*Number*) of the option to be traversed to.  NOTE: This method does not select the option but rather highlights it as if the option is hovered or arrowed to.
* `select`: selects the currently highlighted option
* `getOptIndex`: returns the index (within the currently visible options) of the currently selected option.
* `reset`: clears the filters and deselects any currently selected options.
* `setOptions`: accepts 1 argument which is HTML code in *String* format. Adds one option to the existing dropdown list.
* `setNoResultFound`: shows the *No results found* in dropdown if the matching options not available
* `emptyDropdownList`: Empty the options in the dropdown list
* `updateSelectedOptions`: Empty all the options and update with selected options in the list
* `setCurrentOptions`: Sets the current Option from the current options list

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
