describe('middleware/debuglogger', () => {
    it('can be required', () => {
        jest.dontMock('../debuglogger');
        require('../debuglogger');
    });
});
