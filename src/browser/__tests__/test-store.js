jest.autoMockOff();
describe('browser', () => {
    describe('store', () => {
        it('can be required', () => {
            jest.dontMock('../store');
            require('../store');
        });
    });
});
