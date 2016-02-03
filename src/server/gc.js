import config from 'config';
import { getLogger } from 'log4js';
import * as Board from '../actions/Board';
import { store } from '../stores/server';

const logger = getLogger('[GC]');

export const runGC = () => {
    logger.info('started');

    const boards = store.getState().boards;
    const boardIds = Object.keys(boards);
    const now = Date.now();
    const expires = config.get('gc.expires') * 1000;
    const remove =
        boardIds.filter((id) => now - boards[id].timestamp > expires);

    remove.forEach((id) => store.dispatch(Board.remove(id)));

    logger.info(
        'done',
        `found:${boardIds.length}`,
        `removed:${remove.length}`,
        `rooms:${boardIds.length - remove.length}`
    );
};

setInterval(runGC, config.get('gc.interval') * 1000);