import { camelize } from '../utils';

describe('utils', () => {
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
