import config from 'config';
import { getLogger } from 'log4js';
import { create, update } from '../../actions/Board';
import { push } from '../../actions/Shape';
import * as BOARD from '../../constants/actions/Board';

const logger = getLogger('[BOARD]');

const joinToBoard = (socket, id) => {
    socket.leave();
    socket.join(id);
    socket.boardId = id;
    logger.info(socket.id, 'joined into', id);
};

const onJoin = ({dispatch, getState}, next, action) => {
    const socket = action.socket;

    joinToBoard(socket, action.id);

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

    const shapes = getState().shapes[action.id];

    if (shapes) {
        socket.emit('action', {
            ...push(shapes),
            broadcast: false,
            sync: false,
        });
    }

    return next(action);
};

export const board = ({dispatch, getState}) => (next) => (action) => {
    switch (action.type) {
        case BOARD.JOIN:
            return onJoin({dispatch, getState}, next, action);
        case BOARD.UPDATE:
            return next({
                ...update(action.data),
                sync: false,
                socket: action.socket,
            });
    }

    return next(action);
};