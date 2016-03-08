jest.dontMock('../log');

describe('Browser/Log', () => {
    let orig;
    beforeEach(() => {
        orig = window.console;
        window.console = {
            info: jest.genMockFn(),
            log: jest.genMockFn(),
            error: jest.genMockFn(),
        };
    });
    afterEach(() => {
        window.console = orig;
    });

    it('should expose interfaces like log4js', () => {
        const logger = require('../log').getLogger('[test]');
        logger.log('log');
        logger.info('info');
        logger.debug('debug');
        logger.error('error');
    });
});
