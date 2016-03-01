import { combineReducers } from 'redux';
import { board } from './board';
import { dialog } from './dialog';
import { editor } from './editor';
import { shapes } from './shapes';
import { view } from './view';

export const reducer = combineReducers({
    dialog,
    board,
    editor,
    shapes,
    view,
});
