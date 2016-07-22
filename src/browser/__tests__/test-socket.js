describe('browser/socket', () => {
    jest.dontMock('redux');
    jest.dontMock('color-convert');
    jest.dontMock('../socket');
    require('../socket');
});
