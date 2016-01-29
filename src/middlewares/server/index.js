import { getLogger } from 'log4js';
import { pre, post } from '../debuglogger';
import { board } from './board';
import { socket } from './socket';

export const middleware = [
    pre(getLogger),
    board,
    socket,
    post(getLogger),
];