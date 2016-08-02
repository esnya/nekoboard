describe('components/Canvas', () => {
    it('can be required', () => {
        jest.dontMock('react');
        jest.dontMock('../Canvas');
        require('../Canvas');
    });
});
