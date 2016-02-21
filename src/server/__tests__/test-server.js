jest.mock('http');
describe('server/server', () => {
    jest.dontMock('../server');
    require('../server');
});