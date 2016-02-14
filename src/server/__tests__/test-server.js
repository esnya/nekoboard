jest.mock('http');
describe('server/server', () => {
    jest.dontMock('../server');
    const server = require('../server').server;
});