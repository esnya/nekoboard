import * as BOARD from '../constants/actions/Board';

export const board = (state = null, action) => {
    switch (action.type) {
        case BOARD.CREATE:
        case BOARD.UPDATE:
            return {
                ...action.data,
            };
        default:
            return state;
    }
};