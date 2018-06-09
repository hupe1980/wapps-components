import { isEmpty, isEqual } from './utils';

export default class OptionsHandler {
  constructor(googleMaps, instance, propertyNames = []) {
    this.googleMaps = googleMaps;
    this.instance = instance;
    this.propertyNames = propertyNames;
  }

  getOptionsFromProps = props =>
    Object.keys(props)
      .filter(name => this.propertyNames.includes(name))
      .reduce((options, name) => {
        options[name] = props[name];
        return options;
      }, {});

  updateOptionsFormProps = (props, prevProps) => {
    const options = this.getOptionsFromProps(props);

    Object.keys(options).forEach(name => {
      if (isEqual(options[name], prevProps[name])) {
        delete options[name];
      }
    });

    if (!isEmpty(options)) this.setOptions(options);
  };

  setOptions = props =>
    this.instance.setValues(this.getOptionsFromProps(props));

  setOptionsFromProps = props =>
    this.instance.setValues(this.getOptionsFromProps(props));
}
