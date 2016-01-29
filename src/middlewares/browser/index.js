import { getLogger } from '../../browser/log';
import { pre, post } from '../debuglogger';
import { socket } from './socket';

export const middleware = [
    pre(getLogger, true),
    socket,
    post(getLogger, true),
];