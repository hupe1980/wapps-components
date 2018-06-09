import createGoogleMapsMock from '../createGoogleMapsMock';

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
