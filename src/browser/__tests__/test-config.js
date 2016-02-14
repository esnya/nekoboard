jest.dontMock('../config');

describe('Browser/Config', () => {
    it('should read config from an attribute of body', () => {
        const testConfig = {
            key1: 1,
            nested: {
                value: 'hoge',
            },
        };

        window.document.body
            .setAttribute('data-config', JSON.stringify(testConfig));

        const config = require('../config').config;

        expect(config).toEqual(testConfig);
    });
});