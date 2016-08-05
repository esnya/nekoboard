import { file } from './file';
import { editor } from './editor';
import { socket } from './socket';

export const middleware = [
    editor,
    file,
    socket,
];
