import { file } from './file';
import { editor } from './editor';
import { socket } from './socket';
import title from './title';

export const middleware = [
    editor,
    file,
    socket,
    title,
];
