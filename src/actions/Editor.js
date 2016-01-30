import * as EDITOR from '../constants/actions/EDITOR';

export const setMode = (mode) => ({
    type: EDITOR.MODE,
    mode,
});
export const setShape = (shape) => ({
    type: EDITOR.SHAPE,
    shape,
});
export const setStyle = (stroke, fill) => ({
    type: EDITOR.STYLE,
    stroke,
    fill,
});
export const beginEdit = (x, y) => ({
    type: EDITOR.EDIT_BEGIN,
    x, y,
});
export const updateEdit = (x, y) => ({
    type: EDITOR.EDIT_UPDATE,
    x, y,
});
export const endEdit = (x, y) => ({
    type: EDITOR.EDIT_END,
    x, y,
});
export const cancelEdit = () => ({
    type: EDITOR.EDIT_CANCEL,
});