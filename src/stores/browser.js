import { applyMiddleware, createStore } from 'redux';
import { reducer } from '../reducers/browser';
import { middleware } from '../middlewares/browser';

export const store = applyMiddleware(...middleware)(createStore)(reducer);