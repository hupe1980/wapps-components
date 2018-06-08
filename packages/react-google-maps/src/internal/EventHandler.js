import { camelize } from './utils';

export default class EventHandler {
  constructor(googleMaps, instance) {
    this.event = googleMaps.event;
    this.instance = instance;
    this.listeners = {};
  }

  addListenersFromProps(props, evtNames = []) {
    evtNames.forEach(evtName => {
      this.listeners[evtName] = this.instance.addListener(
        evtName,
        this.handleEvent(props, evtName),
      );
    });
  }

  clearInstanceListeners = () => {
    this.event.clearInstanceListeners(this.instance);
  };

  handleEvent = (props, evtName) => event => {
    const handlerName = camelize(`on_${evtName}`);
    if (props[handlerName]) {
      props[handlerName](this.instance, event);
    }
  };
}
