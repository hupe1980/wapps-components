const createGoogleMapsMock = (libraries = []) => {
  const listeners = {};

  const MVCObject = jest.fn(() => ({
    listeners: {},
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
  }));

  const maps = {
    Animation: {
      BOUNCE: '',
      DROP: '',
    },
    BicyclingLayer: jest.fn(() => ({
      ...MVCObject(),
    })),
    Circle: jest.fn(opts => ({
      ...MVCObject(),
    })),
    MVCObject: MVCObject,
    Map: jest.fn((mapDiv, opts) => ({
      ...MVCObject(),
    })),
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
