import { getLogger } from 'log4js';
import { pre, post } from '../debuglogger';
import { board } from './board';
import { shape } from './shape';
import { socket } from './socket';

export const middleware = [
    pre(true, getLogger),
    board,
    shape,
    socket,
    post(true, getLogger),
];