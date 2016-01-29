import * as DIALOG from '../constants/actions/Dialog';

export const open = (id) => ({
    type: DIALOG.OPEN,
    id,
});
export const close = (id) => ({
    type: DIALOG.CLOSE,
    id,
});