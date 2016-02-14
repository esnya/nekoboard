jest.dontMock('react');

describe('containers/EditTextDialog', () => {
    const connect = require('react-redux').connect;

    jest.dontMock('../EditTextDialog');
    const EditTextDialog = require('../EditTextDialog');
});