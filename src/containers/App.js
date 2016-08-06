import { connect } from 'react-redux';
import { open } from '../actions/dialog';
import {
    save as onSave,
    load as onLoad,
    exportSVG as onExportSVG,
} from '../actions/file';
import { App as Component } from '../components/App';
import { mapActionCreatorsToProps } from './Container';

export const App = connect(
    (state) => ({
        ...state.board,
        edit: state.editor.edit,
    }),
    mapActionCreatorsToProps({
        onOpenConfig: () => open('config'),
        onLoad,
        onSave,
        onExportSVG,
    })
)(Component);
