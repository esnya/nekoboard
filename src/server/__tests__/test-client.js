jest.dontMock('config');
jest.dontMock('../../utility/id');
describe('server/client', () => {
    jest.dontMock('../client');
    require('../client');
});
