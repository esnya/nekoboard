import * as BOARD from '../../constants/actions/Board';

export const boards = (state = {}, action) => {
    switch (action.type) {
        case BOARD.CREATE:
        case BOARD.UPDATE:
            return {
                ...state,
                [action.data.id]: {
                    ...action.data,
                },
            };
        default:
            return state;
    }
};