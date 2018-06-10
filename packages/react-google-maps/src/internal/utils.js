import React from 'react';

export const camelize = str =>
  str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());

export const noop = () => {};

export const compose = (...funcs) =>
  funcs.reduce((f, g) => (...args) => f(g(...args)));

export const isFunction = value => typeof value === 'function';

export const isString = value => typeof value === 'string';

export const isObject = value => typeof value === 'object';

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

const compare = (value, other) => {
  const type = Object.prototype.toString.call(value);

  if (['[object Array]', '[object Object]'].includes(type)) {
    if (!isEqual(value, other)) return false;
    return true;
  } else {
    if (type !== Object.prototype.toString.call(other)) return false;
    if (value !== other) return false;
    return true;
  }
};

export const isEqual = (value, other) => {
  if (value === other) return true;

  if (React.isValidElement(value) || React.isValidElement(other)) {
    return value === other;
  }

  if (value && other && isFunction(value.equals)) {
    return value.equals(other);
  }

  const type = Object.prototype.toString.call(value);

  if (type !== Object.prototype.toString.call(other)) return false;

  const valueLen =
    type === '[object Array]' ? value.length : Object.keys(value).length;
  const otherLen =
    type === '[object Array]' ? other.length : Object.keys(other).length;

  if (valueLen !== otherLen) return false;

  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i++) {
      if (!compare(value[i], other[i])) return false;
    }
    return true;
  }

  if (type === '[object Object]') {
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        if (!compare(value[key], other[key])) return false;
      }
    }
    return true;
  }

  return value === other;
};
