import { pick } from 'lodash';
import * as EDITOR from '../constants/actions/Editor';

export const setMode = (mode) => ({
    type: EDITOR.MODE,
    mode,
});
export const setShape = (shape) => ({
    type: EDITOR.SHAPE,
    shape,
});
export const setStyle = (style) => ({
    ...pick(style, [
        'fill',
        'fillColor',
        'fontSize',
        'stroke',
        'strokeColor',
        'strokeWidth',
    ]),
    type: EDITOR.STYLE,
});
export const setSnap = (snap) => ({
    type: EDITOR.SNAP,
    snap,
});
export const beginEdit = ({x, y, id}) => ({
    type: EDITOR.EDIT_BEGIN,
    x, y, id,
});
export const updateEdit = ({x, y}) => ({
    type: EDITOR.EDIT_UPDATE,
    x, y,
});
export const endEdit = () => ({
    type: EDITOR.EDIT_END,
});
export const cancelEdit = () => ({
    type: EDITOR.EDIT_CANCEL,
});
export const beginMove = (id) => ({
    type: EDITOR.MOVE_BEGIN,
    id,
});
export const updateMove = (x, y) => ({
    type: EDITOR.MOVE_UPDATE,
    x, y,
});
export const endMove = () => ({
    type: EDITOR.MOVE_END,
});
