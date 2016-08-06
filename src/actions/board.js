export const CREATE = 'BOARD/CREATE';
export const create = (data) => ({
    type: CREATE,
    broadcast: true,
    sync: true,
    id: data.id,
    data,
});

export const UPDATE = 'BOARD/UPDATE';
export const update = (data) => ({
    type: UPDATE,
    broadcast: true,
    sync: true,
    id: data.id,
    data,
});

export const JOIN = 'BOARD/JOIN';
export const join = (id) => ({
    type: JOIN,
    sync: true,
    id,
});

export const REMOVE = 'BOARD/REMOVE';
export const remove = (id) => ({
    type: REMOVE,
    id,
});
