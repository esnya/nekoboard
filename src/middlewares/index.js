import { config } from '../browser/config';
import { getLogger } from '../browser/log';
import { pre, post } from './debuglogger';
import { editor } from './editor';
import { socket } from './socket';

export const middleware = [
    pre(config && config.debug, getLogger, true),
    editor,
    socket,
    post(config && config.debug, getLogger, true),
];