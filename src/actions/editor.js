import { pick } from 'lodash';

export const SET_MODE = 'EDITOR/SET_MODE';
export const setMode = (mode) => ({
    type: SET_MODE,
    mode,
});

export const SET_SHAPE = 'EDITOR/SET_SHAPE';
export const setShape = (shape) => ({
    type: SET_SHAPE,
    shape,
});

export const SET_STYLE = 'EDITOR/SET_STYLE';
export const setStyle = (style) => ({
    ...pick(style, [
        'fill',
        'fillColor',
        'fontSize',
        'stroke',
        'strokeColor',
        'strokeWidth',
    ]),
    type: SET_STYLE,
});

export const SET_SNAP = 'EDITOR/SET_SNAP';
export const setSnap = (snap) => ({
    type: SET_SNAP,
    snap,
});

export const BEGIN_EDIT = 'EDITOR/BEGIN_EDIT';
export const beginEdit = ({ x, y, id }) => ({
    type: BEGIN_EDIT,
    x,
    y,
    id,
});

export const UPDATE_EDIT = 'EDITOR/UPDATE_EDIT';
export const updateEdit = ({ x, y }) => ({
    type: UPDATE_EDIT,
    x,
    y,
});

export const END_EDIT = 'EDITOR/END_EDIT';
export const endEdit = () => ({
    type: END_EDIT,
});

export const CANCEL_EDIT = 'EDITOR/CANCEL_EDIT';
export const cancelEdit = () => ({
    type: CANCEL_EDIT,
});

export const BEGIN_MOVE = 'EDITOR/BEGIN_MOVE';
export const beginMove = (id) => ({
    type: BEGIN_MOVE,
    id,
});

export const UPDATE_MOVE = 'EDITOR/UPDATE_MOVE';
export const updateMove = (x, y) => ({
    type: UPDATE_MOVE,
    x,
    y,
});

export const END_MOVE = 'EDITOR/END_MOVE';
export const endMove = () => ({
    type: END_MOVE,
});

export const PUSH_HISTORY = 'EDITOR/PUSH_HISTORY';
export const pushHistory = () => ({
    type: PUSH_HISTORY,
});
