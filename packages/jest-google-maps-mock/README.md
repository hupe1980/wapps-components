# jest-google-maps-mock
Jest google maps mock

## Example
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

## Installation
- `npm install --save-dev @wapps/jest-google-maps-mock`
