export const OPEN = 'DIALOG/OPEN';
export const open = (id, data) => ({
    type: OPEN,
    id,
    data,
});

export const CLOSE = 'DIALOG/CLOSE';
export const close = (id) => ({
    type: CLOSE,
    id,
});
