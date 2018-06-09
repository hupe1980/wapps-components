import { camelize, isEmpty } from './utils';

export const getHandlerName = evtName => camelize(`on_${evtName}`);

export default class EventHandler {
  constructor(googleMaps, instance) {
    this.event = googleMaps.event;
    this.instance = instance;
    this.listeners = {};
  }

  addListenersFromProps = (props, evtNames = []) => {
    evtNames.forEach(evtName => {
      const handlerName = getHandlerName(evtName);

      if (props[handlerName]) {
        this.listeners[evtName] = this.instance.addListener(evtName, event =>
          props[handlerName](this.instance, event),
        );
      }
    });
  };

  clearInstanceListeners = () => {
    if (!isEmpty(this.listeners)) {
      this.event.clearInstanceListeners(this.instance);
      this.listeners = {};
    }
  };

  trigger = (evtName, args) => {
    this.event.trigger(this.instance, evtName, args);
  };
}
