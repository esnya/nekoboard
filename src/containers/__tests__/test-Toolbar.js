jest.dontMock('react');

describe('containers/Toolbar', () => {
    const connect = require('react-redux').connect;

    jest.dontMock('../Toolbar');
    const Toolbar = require('../Toolbar');
});