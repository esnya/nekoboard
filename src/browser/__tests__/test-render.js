jest.dontMock('react');

describe('browser/render', () => {
    it('should render Provider into #app', () => {
        const render = require('react-dom').render;

        const app = document.createElement('div');
        app.setAttribute('id', 'app');
        document.body.appendChild(app);

        jest.dontMock('../render');
        require('../render');

        expect(render.mock.calls.length).toBe(1);
    });
});