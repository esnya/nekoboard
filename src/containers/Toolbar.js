import { connect } from 'react-redux';
import { open } from '../actions/Dialog';
import { setMode, setShape, setSnap } from '../actions/Editor';
import {
    resetZoom as onResetZoom,
    zoomIn as onZoomIn,
    zoomOut as onZoomOut,
    perspective as onChangePerspective,
} from '../actions/View';
import { Toolbar as Component } from '../components/Toolbar';
import { mapActionCreatorsToProps } from './Container';

export const Toolbar = connect(
    (state) => ({
        ...state.editor,
        perspective: state.view.perspective,
    }),
    mapActionCreatorsToProps({
        open,
        setMode,
        setShape,
        setSnap,
        onChangePerspective,
        onResetZoom,
        onZoomIn,
        onZoomOut,
    })
)(Component);
