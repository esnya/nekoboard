import * as EDITOR from '../../constants/actions/Editor';
import * as MODE from '../../constants/Mode';
import * as SHAPE from '../../constants/Shape';

const InitialState = {
    mode: MODE.DEFAULT,
    shape: SHAPE.DEFAULT,
    fill: 'none',
    stroke: '#000000',
    strokeWidth: 1,
    fontSize: 16,
    edit: null,
    move: null,
    snap: null,
};

export const editor = (state = InitialState, action) => {
    switch(action.type) {
        case EDITOR.MODE:
            return {
                ...state,
                mode: action.mode,
            };
        case EDITOR.SHAPE:
            return {
                ...state,
                shape: action.shape,
            };
        case EDITOR.STYLE:
            return {
                ...state,
                stroke: action.stroke,
                fill: action.fill,
                fontSize: action.fontSize,
                strokeWidth: action.strokeWidth,
            };
        case EDITOR.SNAP:
            return {
                ...state,
                snap: action.snap,
            };
        case EDITOR.EDIT_BEGIN:
            if (state.mode === MODE.EDIT) {
                switch(state.shape) {
                    case SHAPE.TEXT:
                    case SHAPE.PIECE:
                        return state;
                }
            }
            return {
                ...state,
                edit: action.id,
            };
        case EDITOR.EDIT_END:
        case EDITOR.EDIT_CANCEL:
            return {
                ...state,
                edit: null,
            };
        default:
            return state;
    }
};