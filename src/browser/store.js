import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from '../reducers';
import { middleware } from '../middlewares';

export default compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(reducer);
