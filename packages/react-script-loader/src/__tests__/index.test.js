describe('react-script-loader', () => {
  const { __esModule, default: withScriptLoader } = require('../');

  it('should be an ES module', () => {
    expect(__esModule).toBe(true);
  });

  it('should have a default export', () => {
    expect(withScriptLoader).toBeDefined();
  });
});
