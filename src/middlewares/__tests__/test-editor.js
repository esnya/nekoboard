describe('middlewares/editor', () => {
    it('can be required', () => {
        jest.unmock('color-convert/route');
        jest.unmock('color-convert');
        jest.unmock('../editor');
        require('../editor');
    });
});
