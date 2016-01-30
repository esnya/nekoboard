import * as SHAPE from '../../constants/actions/Shape';

export const shapes = (state = [], action) => {
    switch(action.type) {
        case SHAPE.PUSH:
            return [
                ...action.items,
                ...state,
            ];
        default:
            return state;
    }
};