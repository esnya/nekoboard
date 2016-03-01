import * as BOARD from '../constants/actions/Board';

/**
 * Board reducer
 * @param{object} state - State
 * @param{object} action - Action
 * @returns{object} Next state
 */
export function board(state = null, action) {
    switch (action.type) {
        case BOARD.CREATE:
        case BOARD.UPDATE:
            return {
                ...action.data,
            };
        default:
            return state;
    }
}
