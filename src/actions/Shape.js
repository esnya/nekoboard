import * as SHAPE from '../constants/actions/Shape';
import { generate } from '../utility/id';

export const push = (items) => ({
    type: SHAPE.PUSH,
    items: (
        Array.isArray(items)
            ? items
            : items && [items]
    ).map((item) => item.id ? item : {
        ...item,
        id: generate(),
    }),
    sync: true,
    broadcast: true,
});
export const update = (item) => ({
    type: SHAPE.UPDATE,
    sync: true,
    broadcast: true,
    item,
});