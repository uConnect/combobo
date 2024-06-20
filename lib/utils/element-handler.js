import select from './select';

const elementHandler = (l, all, context) => {
  context = context || document;
  if (typeof l === 'string') {
    return all ? select.queryAll(l, context) : select.query(l, context);
  }
  return l;
};

export default elementHandler;
