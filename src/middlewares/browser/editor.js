import { open } from '../../actions/Dialog';
import { endEdit } from '../../actions/Editor';
import { push, update, remove } from '../../actions/Shape';
import * as EDITOR from '../../constants/actions/Editor';
import * as MODE from '../../constants/Mode';
import * as SHAPE from '../../constants/Shape';
import { generate } from '../../utility/id';

const setPos = (shape, x, y) => {
    switch(shape.shape) {
        case SHAPE.LINE:
        case SHAPE.MEASURE:
            return {
                ...shape,
                x1: x, y1: y,
                x2: x, y2: y,
            };
        case SHAPE.RECT:
        case SHAPE.TEXT:
        case SHAPE.PIECE:
            return {...shape, x, y};
        case SHAPE.CIRCLE:
        case SHAPE.ELLIPSE:
            return {...shape, cx: x, cy: y};
    }
};

const setSize = (shape, x, y) => {
    switch(shape.shape) {
        case SHAPE.LINE:
        case SHAPE.MEASURE:
            return {
                ...shape,
                x2: x,
                y2: y,
            };
        case SHAPE.RECT:
            return {
                ...shape,
                width: Math.max(x - shape.x, 0),
                height: Math.max(y - shape.y, 0),
            };
        case SHAPE.CIRCLE:
            return {
                ...shape,
                r: Math.sqrt(
                    Math.pow(x - shape.cx, 2) + Math.pow(y - shape.cy, 2)
                ),
            };
        case SHAPE.ELLIPSE:
            return {
                ...shape,
                rx: Math.abs(x - shape.cx),
                ry: Math.abs(y - shape.cy),
            };
        case SHAPE.TEXT:
        case SHAPE.PIECE:
            return shape;
    }
};

const moveTo = (shape, x, y) => {
    switch(shape.shape) {
        case SHAPE.LINE:
        case SHAPE.MEASURE:
            return {
                ...shape,
                x1: x,
                y1: y,
                x2: shape.x2 + x - shape.x1,
                y2: shape.y2 + y - shape.y1,
            };
        default:
            return setPos(shape, x, y);
    }
};

const snapToGrid = (snap, value, size) => snap
    ? Math.round(value / size * 2) * size / 2
    : value;

export const editor = ({dispatch, getState}) => (next) => (action) => {
    const e = getState().editor;
    const b = getState().board;
    const x = action.x && snapToGrid(e.snap, action.x, b.gridSize);
    const y = action.y && snapToGrid(e.snap, action.y, b.gridSize);

    switch(action.type) {
        case EDITOR.EDIT_BEGIN:
            if (e.edit) {
                return next(endEdit());
            } else if (e.mode === MODE.EDIT && !action.id) {
                if (e.shape === SHAPE.TEXT) {
                    return next(open('editText', action));
                }

                const shape = setPos({
                    id: generate(),
                    shape: e.shape,
                    fill: e.fill,
                    stroke: e.stroke,
                    strokeWidth: e.strokeWidth,
                    fontSize: e.fontSize,
                }, x, y);

                dispatch(push(shape));

                return next({
                    ...action,
                    id: shape.id,
                });
            } else if (e.mode === MODE.ERASE && action.id) {
                dispatch(remove(action.id));
            }
            break;
        case EDITOR.EDIT_UPDATE:
            if (e.edit) {
                const shape = getState().shapes.find(({id}) => id === e.edit);

                if (!shape) return next(action);

                switch(e.mode) {
                    case MODE.EDIT:
                        dispatch(update(setSize(
                            shape,
                            x, y
                        )));
                        break;
                    case MODE.MOVE:
                        dispatch(update(moveTo(
                            shape,
                            x, y
                        )));
                        break;
                }
            }
            break;
    }

    return next(action);
};