jest.autoMockOff();
describe('stores/browser', () => {
    jest.dontMock('../browser');
    require('../browser');
});
