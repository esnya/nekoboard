describe('View reducer', () => {
    jest.autoMockOff();
    const View = require('../../actions/View');
    const view = require('../view').view;

    let state;
    it('sets initial state', () => {
        state = view(state, { type: 'INIT' });
        expect(state).toEqual({
            zoom: 1,
        });
    });

    it('zooms in', () => {
        state = view(state, View.zoomIn());
        expect(state).toEqual({
            zoom: 1.1,
        });
    });

    it('resets zoom', () => {
        state = view(state, View.resetZoom());
        expect(state).toEqual({
            zoom: 1.0,
        });
    });

    it('zooms out', () => {
        state = view(state, View.zoomOut());
        expect(state).toEqual({
            zoom: 1.0 / 1.1,
        });
    });
});
