import * as SHAPE from '../../constants/actions/Shape';

export const shapes = (state = [], action) => {
    switch(action.type) {
        case SHAPE.PUSH:
            return [
                ...state,
                ...action.items,
            ];
        default:
            return state;
    }
};