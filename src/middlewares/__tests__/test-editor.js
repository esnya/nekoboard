describe('middlewares/editor', () => {
    jest.unmock('color-convert/route');
    jest.unmock('color-convert');
    jest.unmock('../editor');
    require('../editor');
});
