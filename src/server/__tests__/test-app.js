describe('server/app', () => {
    it('can be required', () => {
        jest.dontMock('../app');
        require('../app');
    });
});
