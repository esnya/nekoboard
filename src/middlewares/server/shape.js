import { push, update } from '../../actions/Shape';
import * as SHAPE from '../../constants/actions/Shape';

export const shape = () => (next) => (action) => {
    switch(action.type) {
        case SHAPE.PUSH:
            return next({
                ...push(action.items),
                sync: false,
                socket: action.socket,
            });
        case SHAPE.UPDATE:
            return next({
                ...update(action.item),
                sync: false,
                socket: action.socket,
            });
    }

    return next(action);
};