import { connect } from 'react-redux';
import {
    beginEdit,
    updateEdit,
    endEdit,
    cancelEdit,
} from '../actions/Editor';
import { open } from '../actions/Dialog';
import { push } from '../actions/Shape';
import { Canvas as Component } from '../components/Canvas';
import { mapActionCreatorsToProps } from './Container';

export const Canvas = connect(
    (state) => ({
        ...state.board,
        edit: state.editor.edit,
        shape: state.editor.shape,
        shapes: state.shapes,
    }),
    mapActionCreatorsToProps({
        beginEdit,
        updateEdit,
        endEdit,
        cancelEdit,
        open,
        push,
    })
)(Component);