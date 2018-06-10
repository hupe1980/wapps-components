import { camelize, compose, noop, isEmpty, isEqual } from '../utils';

describe('internal/utils', () => {
  describe('camelize', () => {
    it('should camelize strings with underscore', () => {
      const str = 'foo_bar';
      expect(camelize(str)).toEqual('fooBar');
    });

    it('should camelize strings with dots', () => {
      const str = 'foo.bar';
      expect(camelize(str)).toEqual('fooBar');
    });

    it('camelize strings with hyphen', () => {
      const str = 'foo-bar';
      expect(camelize(str)).toEqual('fooBar');
    });
  });

  describe('noop', () => {
    it('should return undefined', () => {
      expect(noop()).toEqual(undefined);
    });
  });

  describe('compose', () => {
    it('should return the first function if given only one ', () => {
      expect(compose(noop)).toBe(noop);
    });

    it('should composes from right to left', () => {
      const add10 = x => x + 10;
      const square = x => x * x;

      expect(compose(square)(5)).toBe(25);
      expect(compose(square, add10)(5)).toBe(225);
      expect(compose(add10, square, add10)(5)).toBe(235);
    });
  });

  describe('isEmpty', () => {
    it('should return true if the object is empty', () => {
      expect(isEmpty({})).toEqual(true);
      expect(isEmpty({ test: 'test ' })).toEqual(false);
    });

    it('should return true if the value is null', () => {
      expect(isEmpty(null)).toEqual(true);
      expect(isEmpty(1)).toEqual(false);
      expect(isEmpty(true)).toEqual(false);
      expect(isEmpty('test')).toEqual(false);
    });

    it('should return true if the length of the string is 0', () => {
      expect(isEmpty('')).toEqual(true);
      expect(isEmpty('test')).toEqual(false);
    });
  });

  describe('isEqual', () => {
    it('should return true when values are ===', () => {
      const arr = [1, 2, 3];
      const a1 = arr;
      const a2 = arr;
      expect(isEqual(a1, a2)).toEqual(true);

      const obj = { a: 1, b: 1 };
      const o1 = obj;
      const o2 = obj;
      expect(isEqual(o1, o2)).toEqual(true);

      const str = 'test';
      const s1 = str;
      const s2 = str;
      expect(isEqual(s1, s2)).toEqual(true);

      const num = 1;
      const n1 = num;
      const n2 = num;
      expect(isEqual(n1, n2)).toEqual(true);
    });

    it('should return true when content are equal', () => {
      const a1 = [1, 2, 3];
      const a2 = [1, 2, 3];
      expect(isEqual(a1, a2)).toEqual(true);

      const o1 = { a: 1, b: 1 };
      const o2 = { a: 1, b: 1 };
      expect(isEqual(o1, o2)).toEqual(true);

      const s1 = 'test';
      const s2 = 'test';
      expect(isEqual(s1, s2)).toEqual(true);

      const n1 = 1;
      const n2 = 1;
      expect(isEqual(n1, n2)).toEqual(true);
    });

    it('should return true when both arrays are empty', () => {
      const a = [];
      const b = [];
      expect(isEqual(a, b)).toEqual(true);
    });

    it('should return true when both objects are empty', () => {
      const a = {};
      const b = {};
      expect(isEqual(a, b)).toEqual(true);
    });

    it('should return false when arrays do not have the same amount of elements', () => {
      const a = [1, 2];
      const b = [1, 2, 3];
      expect(isEqual(a, b)).toEqual(false);
    });

    it('should return false if there are corresponding elements which are not ===', () => {
      const a = [1, 2];
      const b = [1, 3];
      expect(isEqual(a, b)).toEqual(false);
    });
  });
});
