import { applyMiddleware, createStore } from 'redux';
import { reducer } from '../reducers';
import { middleware } from '../middlewares';

export const store = applyMiddleware(...middleware)(createStore)(reducer);
