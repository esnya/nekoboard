import color from 'color';
import { open } from '../actions/Dialog';
import { endEdit } from '../actions/Editor';
import { add, update, remove } from '../actions/Shape';
import * as EDITOR from '../constants/actions/Editor';
import * as MODE from '../constants/Mode';
import * as SHAPE from '../constants/Shape';
import { generate } from '../utility/id';

const setPos = (shape, x, y) => {
    switch (shape.shape) {
    case SHAPE.LINE:
    case SHAPE.MEASURE:
        return {
            ...shape,
            x1: x,
            y1: y,
            x2: x,
            y2: y,
        };
    case SHAPE.RECT:
    case SHAPE.TEXT:
    case SHAPE.PIECE:
        return { ...shape, x, y };
    case SHAPE.CIRCLE:
    case SHAPE.ELLIPSE:
        return { ...shape, cx: x, cy: y };
    case SHAPE.POLYGON:
    case SHAPE.POLYLINE:
        return {
            ...shape,
            points: [{ x: 0, y: 0 }],
            x,
            y,
        };
    default:
        return shape;
    }
};

const setSize = (shape, x, y) => {
    switch (shape.shape) {
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
    case SHAPE.POLYGON:
    case SHAPE.POLYLINE:
        return {
            ...shape,
            points: [
                ...shape.points,
                {
                    x: x - shape.x,
                    y: y - shape.y,
                },
            ],
        };
    default:
        return shape;
    }
};

const moveTo = (shape, x, y) => {
    // eslint-disable-next-line default-case
    switch (shape.shape) {
    case SHAPE.LINE:
    case SHAPE.MEASURE:
        return {
            ...shape,
            x1: x,
            y1: y,
            x2: shape.x2 + x - shape.x1,
            y2: shape.y2 + y - shape.y1,
        };
    case SHAPE.POLYGON:
    case SHAPE.POLYLINE:
        return {
            ...shape,
            x,
            y,
        };
    default:
        return setPos(shape, x, y);
    }
};

const getShape = (state, id = null) =>
    state
        .shapes
        .find((shape) => shape.id === (id || state.editor.edit));

const snapToGrid = (snap, pos, size) => (snap
    ? pos.map((value) => Math.round(value / size * 2) * size / 2)
    : pos);

const onBegin = ({ dispatch, getState }, next, action) => {
    const e = getState().editor;

    if (e.edit && e.mode !== MODE.MOVE) {
        return next(endEdit());
    } else if (e.mode === MODE.EDIT && !action.id) {
        // eslint-disable-next-line default-case
        switch (e.shape) {
        case SHAPE.TEXT:
            return next(open('editText', action));
        case SHAPE.PIECE:
            return next(open('piece', action));
        }

        const shape = setPos({
            id: generate(),
            shape: e.shape,
            fill: e.fill ? color(e.fillColor).rgbString() : 'none',
            stroke: e.stroke ? color(e.strokeColor).rgbString() : 'none',
            strokeWidth: e.strokeWidth,
            fontSize: e.fontSize,
        }, ...snapToGrid(
            e.snap,
            [action.x, action.y],
            getState().board.gridSize
        ));

        dispatch(add(shape));

        return next({
            ...action,
            id: shape.id,
        });
    } else if (e.mode === MODE.ERASE && action.id) {
        dispatch(remove(action.id));
    } else if (e.mode === MODE.MOVE && action.id) {
        const shape = getShape(getState(), action.id);

        return next({
            ...action,
            ox: action.x - shape.x,
            oy: action.y - shape.y,
        });
    }

    return next(action);
};

const onUpdate = ({ dispatch, getState }, next, action) => {
    const e = getState().editor;

    if (e.edit) {
        const shape = getShape(getState());

        if (!shape) return next(action);

        const pos = snapToGrid(
            e.snap,
            [action.x, action.y],
            getState().board.gridSize
        );

        // eslint-disable-next-line default-case
        switch (e.mode) {
        case MODE.EDIT:
            dispatch(update(setSize(
                    shape,
                    ...pos
                )));
            break;
        case MODE.MOVE: {
            const offset = snapToGrid(
                    e.snap,
                    [e.ox || 0, e.oy || 0],
                    getState().board.gridSize
                );
            pos[0] -= offset[0];
            pos[1] -= offset[1];

            dispatch(update(moveTo(
                    shape,
                    ...pos
                )));
            break;
        }
        }
    }

    return next(action);
};

export const editor = ({ dispatch, getState }) => (next) => (action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
    case EDITOR.EDIT_BEGIN:
        return onBegin({ dispatch, getState }, next, action);
    case EDITOR.EDIT_UPDATE:
        return onUpdate({ dispatch, getState }, next, action);
    }

    return next(action);
};
