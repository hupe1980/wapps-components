import { camelize, compose, noop, isEmpty } from '../utils';

describe('internal/utils', () => {
  describe('camelize', () => {
    it('camelize strings with underscore', () => {
      const str = 'foo_bar';
      expect(camelize(str)).toEqual('fooBar');
    });

    it('camelize strings with dots', () => {
      const str = 'foo.bar';
      expect(camelize(str)).toEqual('fooBar');
    });

    it('camelize strings with hyphen', () => {
      const str = 'foo-bar';
      expect(camelize(str)).toEqual('fooBar');
    });
  });

  describe('noop', () => {
    it('noop returns undefined', () => {
      expect(noop()).toEqual(undefined);
    });
  });

  describe('compose', () => {
    it('returns the first function if given only one ', () => {
      expect(compose(noop)).toBe(noop);
    });

    it('composes from right to left', () => {
      const add10 = x => x + 10;
      const square = x => x * x;

      expect(compose(square)(5)).toBe(25);
      expect(compose(square, add10)(5)).toBe(225);
      expect(compose(add10, square, add10)(5)).toBe(235);
    });
  });

  describe('isEmpty', () => {
    it('return true if the object is empty', () => {
      expect(isEmpty({})).toEqual(true);
      expect(isEmpty({ test: 'test ' })).toEqual(false);
    });

    it('return true if the value is null', () => {
      expect(isEmpty(null)).toEqual(true);
      expect(isEmpty(1)).toEqual(false);
      expect(isEmpty(true)).toEqual(false);
      expect(isEmpty('test')).toEqual(false);
    });

    it('return true if the length of the string is 0', () => {
      expect(isEmpty('')).toEqual(true);
      expect(isEmpty('test')).toEqual(false);
    });
  });
});
