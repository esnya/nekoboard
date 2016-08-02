describe('components/EditStyleDialog', () => {
    it('can be required', () => {
        jest.unmock('react');
        jest.unmock('color-convert/route');
        jest.unmock('color-convert');
        jest.unmock('../EditStyleDialog');
        require('../EditStyleDialog');
    });
});
