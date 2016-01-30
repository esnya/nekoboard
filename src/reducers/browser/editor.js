import * as EDITOR from '../../constants/actions/Editor';
import * as MODE from '../../constants/Mode';
import * as SHAPE from '../../constants/Shape';

const InitialState = {
    mode: MODE.DEFAULT,
    shape: SHAPE.DEFAULT,
    fill: 'none',
    stroke: 'black',
    edit: null,
};

const beginShape = (shape, x, y) => {
    switch(shape.shape) {
        case SHAPE.RECT:
        case SHAPE.TEXT:
            return {...shape, x, y};
        case SHAPE.CIRCLE:
        case SHAPE.ELLIPSE:
            return {...shape, cx: x, cy: y};
    }
};

const updateShape = (shape, x, y) => {
    switch(shape.shape) {
        case SHAPE.RECT:
        case SHAPE.TEXT:
            return {
                ...shape,
                width: x - shape.x,
                height: y - shape.y,
            };
        case SHAPE.CIRCLE:
        case SHAPE.ELLIPSE:
            return {
                ...shape,
                r: Math.sqrt(
                    Math.pow(x - shape.cx, 2) + Math.pow(y - shape.cy, 2)
                ),
            };
    }
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
        case EDITOR.EDIT_BEGIN:
            if (state.mode !== MODE.EDIT) return state;
            return {
                ...state,
                edit: beginShape({
                    shape: state.shape,
                    fill: state.fill,
                    stroke: state.stroke,
                }, action.x, action.y),
            };
        case EDITOR.EDIT_UPDATE:
            return {
                ...state,
                edit: updateShape(state.edit, action.x, action.y),
            };
        case EDITOR.EDIT_END:
            return {
                ...state,
                edit: null,
            };
        case EDITOR.EDIT_CANCEL:
            return {
                ...state,
                edit: null,
            };
        default:
            return state;
    }
};