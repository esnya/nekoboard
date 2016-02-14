jest.dontMock('config');
jest.dontMock('../../utility/id');
describe('server/client', () => {
    jest.dontMock('../client');
    const Client = require('../client').Client;
});