import { connect } from 'react-redux';
import { setMode, setShape } from '../actions/Editor';
import { Toolbar as Component } from '../components/Toolbar';
import { mapActionCreatorsToProps } from './Container';

export const Toolbar = connect(
    (state) => ({
        ...state.editor,
    }),
    mapActionCreatorsToProps({
        setMode,
        setShape,
    })
)(Component);