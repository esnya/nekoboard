import { connect } from 'react-redux';
import {
    beginEdit,
    updateEdit,
    endEdit,
    cancelEdit,
    beginMove,
    updateMove,
    endMove,
} from '../actions/Editor';
import { open } from '../actions/Dialog';
import { push } from '../actions/Shape';
import { Canvas as Component } from '../components/Canvas';
import { mapActionCreatorsToProps } from './Container';

export const Canvas = connect(
    (state) => ({
        ...state.board,
        editor: state.editor,
        edit: state.editor.edit,
        move: state.editor.move,
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
