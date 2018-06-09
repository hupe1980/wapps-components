import { isEmpty, isEqual } from './utils';

export default class OptionsHandler {
  constructor(googleMaps, instance, propertyNames = []) {
    this.googleMaps = googleMaps;
    this.instance = instance;
    this.propertyNames = propertyNames;
  }

  updateOptionsFormProps = (props, prevProps) => {
    this.propertyNames.forEach(name => {
      const options = {};

      if (!isEqual(props[name], prevProps[name])) {
        options[name] = props[name];
      }
      if (!isEmpty(options)) this.setOptions(options);
    });
  };

  setOptions = options => this.instance.setValues(options);
}
