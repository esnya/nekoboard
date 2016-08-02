describe('middleware/file', () => {
    it('can be required', () => {
        jest.unmock('../file');
        require('../file');
    });
});
