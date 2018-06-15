describe('react-scroll', () => {
  const { __esModule, default: GoogleMaps } = require('../');

  it('should be an ES module', () => {
    expect(__esModule).toBe(true);
  });

  it('should have a default export', () => {
    expect(GoogleMaps).toBeDefined();
  });
});
