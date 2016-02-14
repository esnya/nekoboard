describe('server/app', () => {
    jest.dontMock('../app');
    const app = require('../app').app;
});