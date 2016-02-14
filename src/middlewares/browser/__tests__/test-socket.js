describe('middlewares/browser/socket', () => {
    jest.dontMock('redux');
    jest.dontMock('../socket');
    const socket = require('../socket').socket;
});