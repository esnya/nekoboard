import * as SHAPE from '../../constants/actions/Shape';

export const shapes = (state = [], action) => {
    switch(action.type) {
        case SHAPE.PUSH:
            return [
                ...state.filter(
                    (a) => !action.items.find((b) => a.id === b.id)
                ),
                ...action.items,
            ];
        case SHAPE.UPDATE:
            return state.map((item) =>
                item.id === action.item.id
                    ? {
                        ...item,
                        ...action.item,
                    } : item
            );
        case SHAPE.REMOVE:
            return state.filter(({id}) => id !== action.id);
        default:
            return state;
    }
};