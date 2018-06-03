export const camelize = str =>
  str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());

export const noop = () => {};
