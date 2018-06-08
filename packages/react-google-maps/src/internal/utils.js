export const camelize = str =>
  str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());

export const noop = () => {};

export const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => f(g(...args)));
