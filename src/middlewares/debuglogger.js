export const debuglogger =
    (logger, verbose) => ({getState}) => (next) => (action) => {
        if (verbose) logger.debug(action.type, action, getState());
        else if (action.socket) logger.debug(action.type, action.socket.id);
        else logger.debug(action.type);

        return next(action);
    };

export const pre = (getLogger, verbose) =>
    debuglogger(getLogger(`[ACTION:PRE]`), verbose);
export const post = (getLogger, verbose) =>
    debuglogger(getLogger(`[ACTION:POST]`), verbose);