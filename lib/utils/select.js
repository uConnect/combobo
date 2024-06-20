export const query = (selector, context) => {
  context = context || document;
  return context.querySelector(selector);
};

export const queryAll = (selector, context = document) => {
  return Array.from(context.querySelectorAll(selector));
};

export default { query, queryAll };
