import { connect } from 'react-redux';
import { open } from '../actions/Dialog';
import { App as Component } from '../components/App';
import { mapActionCreatorsToProps } from './Container';

export const App = connect(
    (state) => ({
        ...state.board,
        edit: state.editor.edit,
    }),
    mapActionCreatorsToProps({
        open,
    })
)(Component);
