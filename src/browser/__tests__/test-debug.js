jest.autoMockOff();
describe('browser', () => {
    describe('debug', () => {
        it('can be required', () => {
            jest.dontMock('../debug');
            require('../debug');
        });
    });
});
