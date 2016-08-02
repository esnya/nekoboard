import { sortBy } from 'lodash';
import * as SHAPE from '../constants/actions/Shape';

/**
 * Board reducer
 * @param{object} state - State
 * @param{object} action - Action
 * @returns{object} Next state
 */
export function shapes(state = [], action) {
    switch (action.type) {
    case SHAPE.ADD:
        return [
            ...state.filter(({ id }) => id !== action.data.id),
            {
                ...action.data,
            },
        ];
    case SHAPE.LIST:
        return sortBy(action.items || [], 'timestamp')
            .filter((a) => a)
            .map((item) => ({ ...item }))
            .reverse();
    case SHAPE.PUSH:
        return [
            ...state.filter(
                    (a) => !action.items.find((b) => a.id === b.id)
                ),
            ...action.items,
        ];
    case SHAPE.UPDATE:
        return [
            ...state.filter(({ id }) => id !== action.item.id),
                { ...action.item },
        ];
    case SHAPE.REMOVE:
        return state.filter(({ id }) => id !== action.id);
    default:
        return state;
    }
}
