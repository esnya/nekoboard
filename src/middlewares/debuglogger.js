export const debuglogger =
    (enabled, logger, verbose) => ({getState}) => (next) => (action) => {
        if (enabled) {
            if (verbose) logger.debug(action.type, action, getState());
            else if (action.socket) {
                logger.debug(action.type, action.socket.id);
            } else logger.debug(action.type);
        }

        return next(action);
    };

export const pre = (enabled, getLogger, verbose) =>
    debuglogger(enabled, getLogger(`[ACTION:PRE]`), verbose);
export const post = (enabled, getLogger, verbose) =>
    debuglogger(enabled, getLogger(`[ACTION:POST]`), verbose);
