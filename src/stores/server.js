import { applyMiddleware, createStore } from 'redux';
import { reducer } from '../reducers/server';
import { middleware } from '../middlewares/server';

export const store = applyMiddleware(...middleware)(createStore)(reducer);