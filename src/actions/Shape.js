import * as SHAPE from '../constants/actions/Shape';

export const push = (items) => ({
    type: SHAPE.PUSH,
    items: Array.isArray(items)
        ? items
        : items && [items],
    sync: true,
    broadcast: true,
});