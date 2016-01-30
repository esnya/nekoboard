import * as SHAPE from '../../constants/actions/Shape';

export const shapes = (state = {}, action) => {
    const socket = action.socket;
    const boardId = socket && socket.boardId;

    switch(action.type) {
        case SHAPE.PUSH:
            if (!boardId) return state;
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
            if (!boardId) return state;
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
        default:
            return state;
    }
};