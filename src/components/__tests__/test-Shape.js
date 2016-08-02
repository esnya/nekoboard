describe('components/Shape', () => {
    it('can be required', () => {
        jest.dontMock('react');
        jest.dontMock('../Shape');
        require('../Shape');
    });
});
