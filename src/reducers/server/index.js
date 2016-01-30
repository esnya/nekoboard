import { combineReducers } from 'redux';
import { boards } from './board';
import { shapes } from './shapes';

export const reducer = combineReducers({
    boards,
    shapes,
});