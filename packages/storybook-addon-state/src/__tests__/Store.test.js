import Store from '../Store';

describe('Store', () => {
  const initialState = { foo: 'bar' };
  let store;

  beforeEach(() => {
    store = new Store(initialState);
  });

  it('should return the state value', () => {
    expect(store.get('foo')).toEqual(initialState.foo);
  });

  it('should subscribe and unsubscribe handler ', () => {
    const handler = jest.fn();

    const subscription = store.subscribe(handler);
    store.set({ foo: 'baz' });
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith({ foo: 'baz' });
    expect(store.state).toEqual({ foo: 'baz' });

    store.unsubscribe(subscription);
    store.set({ foo: 'qux' });
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith({ foo: 'baz' });
    expect(store.state).toEqual({ foo: 'qux' });
  });

  it('should have initial state', () => {
    expect(store.state).toEqual(initialState);
  });
});
