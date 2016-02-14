jest.autoMockOff();
describe('stores/browser', () => {
    jest.dontMock('../browser');
    const store = require('../browser').store;
});