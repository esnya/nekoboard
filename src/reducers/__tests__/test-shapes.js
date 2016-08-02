describe('reducers/shapes', () => {
    it('can be required', () => {
        jest.dontMock('../shapes');
        require('../shapes');
    });
});
