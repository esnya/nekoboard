jest.dontMock('react');

describe('containers/App', () => {
    const connect = require('react-redux').connect;

    jest.dontMock('../App');
    const App = require('../App');
});