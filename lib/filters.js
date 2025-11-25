/**
 * Get the text content for filtering purposes.
 * Always uses the visible text, not data-value attribute.
 */
function getFilterText(element) {
  return (element.innerText || element.textContent || '').trim();
}

export default {
  contains: (text, opts) => {
    return opts.filter((o) =>
      getFilterText(o).toLowerCase().includes(text.toLowerCase())
    );
  },
  equals: (text, opts) => {
    return opts.filter((o) => getFilterText(o).toLowerCase() === text.toLowerCase());
  },
  'starts-with': (text, opts) => {
    return opts.filter((o) =>
      getFilterText(o).toLowerCase().startsWith(text.toLowerCase())
    );
  },
};
