import val from './value';

export default {
  contains: (text, opts) => {
    return opts.filter((o) =>
      val(o).toLowerCase().includes(text.toLowerCase())
    );
  },
  equals: (text, opts) => {
    return opts.filter((o) => val(o).toLowerCase() === text.toLowerCase());
  },
  'starts-with': (text, opts) => {
    return opts.filter((o) =>
      val(o).toLowerCase().startsWith(text.toLowerCase())
    );
  },
};
