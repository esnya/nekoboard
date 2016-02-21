import * as SHAPE from '../constants/actions/Shape';

export const shapes = (state = [], action) => {
    switch (action.type) {
        case SHAPE.ADD:
            return [
                ...state.filter(({id}) => id !== action.data.id),
                {
                    ...action.data,
                },
            ];
        case SHAPE.LIST:
            return (action.items || [])
                .filter((a) => a)
                .map((item) => ({...item}));
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