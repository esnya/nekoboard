jest.mock('http');
describe('server/server', () => {
    it('can be required', () => {
        jest.dontMock('../server');
        require('../server');
    });
});
