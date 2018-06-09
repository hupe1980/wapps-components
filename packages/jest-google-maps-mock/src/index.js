const createGoogleMapsMock = (libraries = []) => {
  const createMVCObject = instance => {
    const listeners = {};
    instance.listeners = listeners;

    const funcs = {
      addListener: jest.fn((event, fn) => {
        listeners[event] = listeners[event] || [];
        listeners[event].push(fn);
        return {
          remove: () => {
            const index = listeners[event].indexOf(fn);

            if (index !== -1) {
              listeners[event].splice(index, 1);
            }
          },
        };
      }),
      bindTo: jest.fn(),
      get: jest.fn(),
      notify: jest.fn(),
      set: jest.fn(),
      setValues: jest.fn(),
      unbind: jest.fn(),
      unbindAll: jest.fn(),
    };

    Object.keys(funcs).forEach(key => {
      instance[key] = funcs[key];
    });
  };

  const maps = {
    Animation: {
      BOUNCE: '',
      DROP: '',
    },
    BicyclingLayer: jest.fn(() => ({})),
    Circle: jest.fn(opts => ({})),
    //MVCObject: MVCObject,
    Map: jest.fn().mockImplementation(function(mapDiv, options) {
      this.mapDiv = mapDiv;
      this.options = options;
      createMVCObject(this);
    }),
    event: {
      clearInstanceListeners: jest.fn(),
    },
  };

  if (libraries.includes('places')) {
    maps.places = {
      AutocompleteService: jest.fn(() => ({
        getPlacePredictions: jest.fn(),
      })),
    };
  }

  return maps;
};

export default createGoogleMapsMock;
