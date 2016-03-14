import { config } from '../browser/config';
import { getLogger } from '../browser/log';
import { pre, post } from './debuglogger';
import { file } from './file';
import { editor } from './editor';
import { socket } from './socket';

export const middleware = [
    pre(config && config.debug, getLogger, true),
    editor,
    file,
    socket,
    post(config && config.debug, getLogger, true),
];
