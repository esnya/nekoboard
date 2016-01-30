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
                    ...(state[boardId] || []),
                    ...action.items,
                ],
            };
        default:
            return state;
    }
};