describe('MongoDB Setup', () => {
  it('can import mongoose', () => {
    const mongoose = require('mongoose');
    expect(mongoose).toBeDefined();
  });
});