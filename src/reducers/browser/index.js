import { combineReducers } from 'redux';
import { board } from './board';
import { dialog } from './dialog';

export const reducer = combineReducers({
    dialog,
    board,
});