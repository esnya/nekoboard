import { open } from '../../actions/Dialog';
import { endEdit } from '../../actions/Editor';
import { push, update } from '../../actions/Shape';
import * as EDITOR from '../../constants/actions/Editor';
import * as MODE from '../../constants/Mode';
import * as SHAPE from '../../constants/Shape';
import { generate } from '../../utility/id';

const setPos = (shape, x, y) => {
    switch(shape.shape) {
        case SHAPE.RECT:
        case SHAPE.TEXT:
            return {...shape, x, y};
        case SHAPE.CIRCLE:
        case SHAPE.ELLIPSE:
            return {...shape, cx: x, cy: y};
    }
};

const setSize = (shape, x, y) => {
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

export const editor = ({dispatch, getState}) => (next) => (action) => {
    const e = getState().editor;

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
                }, action.x, action.y);

                dispatch(push(shape));

                return next({
                    ...action,
                    id: shape.id,
                });
            }
            break;
        case EDITOR.EDIT_UPDATE:
            if (e.edit) {
                if (e.mode === MODE.EDIT) {
                    const shape = setSize(
                        getState().shapes.find(({id}) => id === e.edit),
                        action.x, action.y
                    );

                    dispatch(update(shape));
                }
            }
            break;
    }

    return next(action);
};