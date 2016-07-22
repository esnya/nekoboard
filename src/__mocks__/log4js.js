const logger = {
};

module.exports.getLogger = jest.fn().mockReturnValue(logger);
module.exports.mockLogger = logger;
module.exports.levels = {};
module.exports.connectLogger = jest.fn();
