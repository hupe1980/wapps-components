describe('react-stripe-checkout', () => {
  const { __esModule, default: StripeCheckout } = require('../');

  it('should be an ES module', () => {
    expect(__esModule).toBe(true);
  });

  it('should have a default export', () => {
    expect(StripeCheckout).toBeDefined();
  });
});
