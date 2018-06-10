class Store {
  constructor(state = {}) {
    this.state = { ...state };
    this.handlers = []; // observers
  }

  set(newState) {
    this.state = { ...this.state, ...newState };
    this.fire();
  }

  get(key) {
    return this.state[key];
  }

  subscribe(fn) {
    this.handlers.push(fn);
    return fn;
  }

  unsubscribe(fn) {
    this.handlers = this.handlers.filter(handler => handler !== fn);
  }

  fire() {
    this.handlers.forEach(handler => handler(this.state));
  }
}

export default Store;
