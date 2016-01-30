import * as SHAPE from '../../constants/actions/Shape';

export const shapes = (state = {}, action) => {
    const socket = action.socket;
    const boardId = socket && socket.boardId;

    if (!boardId) return state;
    switch(action.type) {
        case SHAPE.PUSH:
            return {
                ...state,
                [boardId]: [
                    ...(state[boardId] || [])
                        .filter(
                            (a) => !action.items.find((b) => a.id === b.id)
                        ),
                    ...action.items,
                ],
            };
        case SHAPE.UPDATE:
            return {
                ...state,
                [boardId]: (state[boardId] || [])
                    .map((item) => item.id === action.item.id
                        ? {
                            ...item,
                            ...action.item,
                        } : item
                    ),
            };
        case SHAPE.REMOVE:
            return {
                ...state,
                [boardId]: (state[boardId] || [])
                    .filter(({id}) => id !== action.id),
            };
        default:
            return state;
    }
};