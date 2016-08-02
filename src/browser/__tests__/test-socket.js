describe('browser/socket', () => {
    it('can be required', () => {
        jest.dontMock('redux');
        jest.dontMock('color-convert');
        jest.dontMock('../socket');
        require('../socket');
    });
});
