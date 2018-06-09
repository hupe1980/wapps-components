import React from 'react';

export const camelize = str =>
  str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());

export const noop = () => {};

export const compose = (...funcs) =>
  funcs.reduce((f, g) => (...args) => f(g(...args)));

export const isFunction = value => typeof value === 'function';

export const isString = value => typeof value === 'string';

export const isEmpty = value => {
  if (value == null) return true;

  if (Array.isArray(value) || isString(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
};

export const isEqual = (a, b) => {
  if (a === b) return true;

  if (React.isValidElement(a) || React.isValidElement(b)) {
    return a === b;
  }

  if (a && b && isFunction(a.equals)) {
    return a.equals(b);
  }

  return a === b; //TODO;
};
