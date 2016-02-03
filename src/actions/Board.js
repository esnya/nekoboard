import * as BOARD from '../constants/actions/Board';

export const create = (data) => ({
    type: BOARD.CREATE,
    broadcast: true,
    sync: true,
    id: data.id,
    data,
});
export const update = (data) => ({
    type: BOARD.UPDATE,
    broadcast: true,
    sync: true,
    id: data.id,
    data,
});
export const join = (id) => ({
    type: BOARD.JOIN,
    sync: true,
    id,
});
export const remove = (id) => ({
    type: BOARD.REMOVE,
    id,
});