describe('middlewares/socket', () => {
    jest.unmock('redux');
    jest.unmock('color-convert/route');
    jest.unmock('color-convert');
    jest.unmock('../socket');
    require('../socket');
});
