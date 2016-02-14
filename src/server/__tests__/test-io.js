jest.mock('http');
jest.dontMock('config');
describe('server/io', () => {
    jest.dontMock('../io');
    const io = require('../io').io;
});