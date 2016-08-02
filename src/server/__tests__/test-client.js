jest.dontMock('config');
jest.dontMock('../../utility/id');
describe('server/client', () => {
    it('can be required', () => {
        jest.dontMock('../client');
        require('../client');
    });
});
