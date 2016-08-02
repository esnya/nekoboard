jest.mock('http');
jest.dontMock('config');
describe('server/io', () => {
    it('can be required', () => {
        jest.dontMock('../io');
        require('../io');
    });
});
