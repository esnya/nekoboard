jest.mock('http');
jest.dontMock('config');
describe('server/io', () => {
    jest.dontMock('../io');
    require('../io');
});