import { socket as soc } from '../browser/socket';

export const socket = () => (next) => (action) => {
    const {
        sync,
        ...nextAction,
    } = action;

    if (sync) {
        soc.emit('action', nextAction);
    }

    return next(nextAction);
};
