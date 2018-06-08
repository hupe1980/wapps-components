export const updateProperties = (instance, props, prevProps, propNames) => {
  propNames.forEach(name => {
    const options = {};

    if (props[name] !== prevProps[name]) {
      //TODO
      options[name] = props[name];
    }
    instance.setValues(options);
  });
};
