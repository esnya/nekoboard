import { connect } from 'react-redux';
import {
    beginEdit,
    updateEdit,
    endEdit,
    cancelEdit,
    beginMove,
    updateMove,
    endMove,
} from '../actions/editor';
import { open } from '../actions/dialog';
import { push } from '../actions/shape';
import { Canvas as Component } from '../components/Canvas';
import { mapActionCreatorsToProps } from './Container';

export const Canvas = connect(
    (state) => ({
        ...state.board,
        editor: state.editor,
        edit: state.editor.edit,
        move: state.editor.move,
        perspective: state.view.perspective,
        shape: state.editor.shape,
        shapes: state.shapes,
        zoom: state.view.zoom,
    }),
    mapActionCreatorsToProps({
        beginEdit,
        updateEdit,
        endEdit,
        cancelEdit,
        beginMove,
        updateMove,
        endMove,
        open,
        push,
    })
)(Component);
