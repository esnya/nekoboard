describe('utility/id', () => {
    jest.dontMock('../id');
    const generate = require('../id').generate;

    it('should be unique', () => {
        expect(generate()).not.toEqual(generate());
        expect(generate()).not.toEqual(generate());
        expect(generate()).not.toEqual(generate());
        expect(generate()).not.toEqual(generate());
    });
});
