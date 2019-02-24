# jest-google-maps-mock

[![Build Status](https://travis-ci.org/hupe1980/wapps-components.svg?branch=master)](https://travis-ci.org/hupe1980/wapps-components)

> Jest google maps mock

## Installation

```bash
npm install --save-dev @wapps/jest-google-maps-mock
```

## How to use

```js
import createGoogleMapsMock from '@wapps/jest-google-maps-mock';

describe('createGoogleMapsMock', () => {
  let googleMaps;

  beforeEach(() => {
    googleMaps = createGoogleMapsMock();
  });

  it('should create a map mock', () => {
    const mapDiv = document.createElement('div');
    new googleMaps.Map(mapDiv);

    expect(googleMaps.Map).toHaveBeenCalledTimes(1);
    expect(googleMaps.Map.mock.instances.length).toBe(1);
    expect(googleMaps.Map).toHaveBeenLastCalledWith(mapDiv);
  });
});
```

## License

[MIT](../../LICENSE)
