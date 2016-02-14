jest.dontMock('react');

describe('containers/BoardConfigDialog', () => {
    const connect = require('react-redux').connect;

    jest.dontMock('../BoardConfigDialog');
    const BoardConfigDialog = require('../BoardConfigDialog');
});