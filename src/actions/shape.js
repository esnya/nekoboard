import { generate } from '../utility/id';

export const ADD = 'SHAPE/ADD';
export const add = (data) => ({
    type: ADD,
    sync: true,
    data: data.id ? data : {
        ...data,
        id: generate(),
    },
});

export const LIST = 'SHAPE/LIST';
export const list = (items) => ({
    type: LIST,
    items,
});

export const PUSH = 'SHAPE/PUSH';
export const push = (items) => ({
    type: PUSH,
    items: (
        Array.isArray(items)
            ? items
            : items && [items]
    ).map((item) => (item.id ? item : {
        ...item,
        id: generate(),
    })),
    sync: true,
    broadcast: true,
});

export const UPDATE = 'SHAPE/UPDATE';
export const update = (item) => ({
    type: UPDATE,
    sync: true,
    broadcast: true,
    item,
});

export const REMOVE = 'SHAPE/REMOVE';
export const remove = (id) => ({
    type: REMOVE,
    sync: true,
    broadcast: true,
    id,
});
