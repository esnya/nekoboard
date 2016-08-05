describe('theme', () => {
    jest.unmock('../theme');
    const theme = require('../theme').default;

    it('is object', () => {
        expect(typeof (theme)).toEqual('object');
    });
});
