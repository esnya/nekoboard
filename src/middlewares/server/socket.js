import { io } from '../../server/io';

export const socket = () => (next) => (action) => {
    const {
        broadcast,
        sync,
        ...nextAction,
    } = action;
    const boardId = action.socket && action.socket.boardId;

    if (sync && nextAction.socket) {
        nextAction.socket.emit('action', {
            ...nextAction,
            socket: null,
        });
    }
    if (broadcast && boardId) {
        io.to(boardId).emit('action', {
            ...nextAction,
            socket: null,
        });
    }

    return next(nextAction);
};