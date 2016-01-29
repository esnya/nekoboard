import config from 'config';
import { getLogger } from 'log4js';
import { create, update }from '../../actions/Board';
import * as BOARD from '../../constants/actions/Board';

const logger = getLogger('[BOARD]');

export const board = ({dispatch, getState}) => (next) => (action) => {
    const socket = action.socket;

    switch(action.type) {
        case BOARD.JOIN:
            socket.leave();
            socket.join(action.id);
            logger.info(socket.id, 'joined into', action.id);
            if (action.id in getState().boards) {
                dispatch({
                    ...update(getState().boards[action.id]),
                    broadcast: false,
                    sync: true,
                    socket,
                });
            } else {
                dispatch({
                    ...create({
                        ...config.get('board'),
                        id: action.id,
                        owner: action.socket.id,
                    }),
                    socket,
                });
            }
            break;
        case BOARD.UPDATE:
            if (socket) {
                dispatch(update(action.data));
            }
            break;
    }

    return next(action);
};