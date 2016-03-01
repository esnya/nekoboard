import { connect } from 'react-redux';
import { open } from '../actions/Dialog';
import { setMode, setShape, setSnap } from '../actions/Editor';
import {
    resetZoom as onResetZoom,
    zoomIn as onZoomIn,
    zoomOut as onZoomOut,
} from '../actions/View';
import { Toolbar as Component } from '../components/Toolbar';
import { mapActionCreatorsToProps } from './Container';

export const Toolbar = connect(
    (state) => ({
        ...state.editor,
    }),
    mapActionCreatorsToProps({
        open,
        setMode,
        setShape,
        setSnap,
        onResetZoom,
        onZoomIn,
        onZoomOut,
    })
)(Component);