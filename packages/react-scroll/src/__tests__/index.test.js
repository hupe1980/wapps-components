describe('react-google-maps', () => {
  const { __esModule, default: Scroll } = require('../');

  it('should be an ES module', () => {
    expect(__esModule).toBe(true);
  });

  it('should have a default export', () => {
    expect(Scroll).toBeDefined();
  });
});
