import { config } from '../../browser/config';
import { getLogger } from '../../browser/log';
import { pre, post } from '../debuglogger';
import { socket } from './socket';

export const middleware = [
    pre(config.debug, getLogger, true),
    socket,
    post(config.debug, getLogger, true),
];