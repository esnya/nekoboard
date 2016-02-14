jest.dontMock('react');

describe('containers/Container', () => {
    const connect = require('react-redux').connect;

    jest.dontMock('../Container');
    const Container = require('../Container');
});