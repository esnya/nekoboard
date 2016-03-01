import { pick } from 'lodash';
import * as EDITOR from '../constants/actions/Editor';
import * as MODE from '../constants/Mode';
import * as SHAPE from '../constants/Shape';

const key = 'nekoboard/editor';
const SAVE_KEYS = [
    'mode',
    'shape',
    'fill',
    'shapeHistory',
    'stroke',
    'strokeWidth',
    'snap',
];
const load = () => {
    if (!window.localStorage) return {};

    const data = localStorage.getItem(key);

    return data && pick(JSON.parse(data), SAVE_KEYS);
};
const save = (e) => {
    if (window.localStorage) {
        localStorage.setItem(key, JSON.stringify(pick(e, SAVE_KEYS)));
    }

    return e;
};

const DefaultState = {
    mode: MODE.DEFAULT,
    shape: SHAPE.DEFAULT,
    fill: 'none',
    styleHistory: [],
    stroke: '#000000',
    strokeWidth: 1,
    fontSize: 16,
    edit: null,
    snap: true,
    ox: 0, oy: 0,
};
const InitialState = {
    ...DefaultState,
    ...load(),
};

export const editor = (state = InitialState, action) => {
    switch (action.type) {
        case EDITOR.MODE:
            return save({
                ...state,
                mode: action.mode,
            });
        case EDITOR.SHAPE:
            return save({
                ...state,
                shape: action.shape,
            });
        case EDITOR.STYLE: {
            const style = {
                stroke: action.stroke,
                fill: action.fill,
                fontSize: action.fontSize,
                strokeWidth: action.strokeWidth,
            };
            return save({
                ...state,
                ...style,
                styleHistory: [
                    style,
                    ...state.styleHistory,
                ].slice(0, 10),
            });
        } case EDITOR.SNAP:
            return save({
                ...state,
                snap: action.snap,
            });
        case EDITOR.EDIT_BEGIN:
            if (state.mode === MODE.EDIT) {
                switch (state.shape) {
                    case SHAPE.TEXT:
                    case SHAPE.PIECE:
                        return state;
                }
            } else if (state.mode === MODE.ERASE || !action.id) {
                return state;
            }
            return save({
                ...state,
                edit: action.id,
                ...pick(action, ['ox', 'oy']),
            });
        case EDITOR.EDIT_END:
        case EDITOR.EDIT_CANCEL:
            return save({
                ...state,
                edit: null,
            });
        default:
            return state;
    }
};