describe('middlewares/socket', () => {
    it('can be required', () => {
        jest.unmock('redux');
        jest.unmock('color-convert/route');
        jest.unmock('color-convert');
        jest.unmock('../socket');
        require('../socket');
    });
});
