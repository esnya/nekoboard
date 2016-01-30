import { config } from '../../browser/config';
import { getLogger } from '../../browser/log';
import { pre, post } from '../debuglogger';
import { editor } from './editor';
import { socket } from './socket';

export const middleware = [
    pre(config.debug, getLogger, true),
    editor,
    socket,
    post(config.debug, getLogger, true),
];