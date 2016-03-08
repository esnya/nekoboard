import * as DIALOG from '../constants/actions/Dialog';

export const open = (id, data) => ({
    type: DIALOG.OPEN,
    id,
    data,
});
export const close = (id) => ({
    type: DIALOG.CLOSE,
    id,
});
