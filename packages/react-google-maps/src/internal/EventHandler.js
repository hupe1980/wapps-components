import { camelize } from './utils';

export default class EventHandler {
  constructor(instance, props, evtNames = []) {
    this.instance = instance;
    this.props = props;

    this.listeners = {};

    evtNames.forEach(evtName => {
      this.listeners[evtName] = instance.addListener(
        evtName,
        this.handleEvent(evtName),
      );
    });
  }

  clearInstanceListeners = () => {
    Object.keys(this.listeners).forEach(evtName => {
      this.listeners[evtName].remove();
    });
  };

  handleEvent = evtName => event => {
    const handlerName = camelize(`on_${evtName}`);
    if (this.props[handlerName]) {
      this.props[handlerName](this.instance, event);
    }
  };
}
