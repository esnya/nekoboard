jest.dontMock('react');

describe('containers/Canvas', () => {
    const connect = require('react-redux').connect;

    jest.dontMock('../Canvas');
    const Canvas = require('../Canvas');
});