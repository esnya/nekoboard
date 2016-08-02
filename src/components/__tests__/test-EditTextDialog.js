describe('components/EditTextDialog', () => {
    it('can be required', () => {
        jest.dontMock('react');
        jest.dontMock('../EditTextDialog');
        require('../EditTextDialog');
    });
});
