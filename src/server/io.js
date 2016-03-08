import IO from 'socket.io';
import { getLogger } from 'log4js';
import * as BOARD from '../constants/actions/Board';
import * as SHAPE from '../constants/actions/Shape';
import { Client } from './client';
import { server } from './server';

const logger = getLogger('[SOCKET]');

export const io = IO(server);

io.on('connection', (socket) => {
    const boardId = socket.handshake.query.boardId;
    if (!boardId) {
        socket.close();

        return;
    }

    logger.info('New connection', socket.id, '@', boardId);

    const client = new Client(boardId);
    client.on('action', (action) => socket.emit('action', action));

    socket.on('disconnect', () => client.end());

    socket.on('action', (action) => {
        switch (action.type) {
            case BOARD.UPDATE:
                return client.setBoard(action.data);
            case SHAPE.ADD:
                return client.addShape(action.data);
            case SHAPE.UPDATE:
                return client.updateShape(action.item);
            case SHAPE.REMOVE:
                return client.removeShape(action.id);
        }
    });
});
