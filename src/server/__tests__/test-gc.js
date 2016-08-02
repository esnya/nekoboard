describe('server/gc', () => {
    it('can be required', () => {
        jest.dontMock('../gc');
        require('../gc');
    });
});
