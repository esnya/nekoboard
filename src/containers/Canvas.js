import { connect } from 'react-redux';
import {
    beginEdit,
    updateEdit,
    endEdit,
    cancelEdit,
} from '../actions/Editor';
import { push } from '../actions/Shape';
import { Canvas as Component } from '../components/Canvas';
import { mapActionCreatorsToProps } from './Container';

export const Canvas = connect(
    (state) => ({
        ...state.board,
        edit: state.editor.edit,
        shapes: state.shapes,
    }),
    mapActionCreatorsToProps({
        beginEdit,
        updateEdit,
        endEdit,
        cancelEdit,
        push,
    })
)(Component);