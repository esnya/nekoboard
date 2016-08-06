import * as DIALOG from '../actions/dialog';

/**
 * Board reducer
 * @param{object} state - State
 * @param{object} action - Action
 * @returns{object} Next state
 */
export function dialog(state = {}, action) {
    switch (action.type) {
    case DIALOG.OPEN:
        return {
            ...state,
            [action.id]: action.data || true,
        };
    case DIALOG.CLOSE:
        return {
            ...state,
            [action.id]: false,
        };
    default:
        return state;
    }
}
