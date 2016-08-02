describe('components/BoardConfigDialog', () => {
    it('can be required', () => {
        jest.dontMock('react');
        jest.dontMock('../BoardConfigDialog');
        require('../BoardConfigDialog');
    });
});
