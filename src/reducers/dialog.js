import * as DIALOG from '../constants/actions/Dialog';

export const dialog = (state = {}, action) => {
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
};