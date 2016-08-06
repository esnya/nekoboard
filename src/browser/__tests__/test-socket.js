describe('browser', () => {
    describe('socket', () => {
        it('can be required', () => {
            jest.unmock('redux');
            jest.unmock('color-convert');
            jest.unmock('immutable');
            jest.unmock('../socket');
            require('../socket');
        });
    });
});
