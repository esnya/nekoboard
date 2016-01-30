import { connect } from 'react-redux';
import { open } from '../actions/Dialog';
import { setMode, setShape } from '../actions/Editor';
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
    })
)(Component);