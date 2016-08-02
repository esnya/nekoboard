jest.autoMockOff();
describe('stores/browser', () => {
    it('can be required', () => {
        jest.dontMock('../browser');
        require('../browser');
    });
});
