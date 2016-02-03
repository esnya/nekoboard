import { transform } from 'lodash';
import * as BOARD from '../../constants/actions/Board';

export const boards = (state = {}, action) => {
    switch (action.type) {
        case BOARD.CREATE:
        case BOARD.UPDATE:
            return {
                ...state,
                [action.data.id]: {
                    ...action.data,
                    timestamp: Date.now(),
                },
            };
        case BOARD.REMOVE:
            return transform(state, (nextState, board, id) => {
                if (id !== action.id) {
                    nextState[id] = board;
                }
            }, {});
        default:
            return state;
    }
};