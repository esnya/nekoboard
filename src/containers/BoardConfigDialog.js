import { connect } from 'react-redux';
import { mapActionCreatorsToProps } from './Container';
import {
    BoardConfigDialog as Component,
} from '../components/BoardConfigDialog';
import { update } from '../actions/Board';
import { close } from '../actions/Dialog';

export const BoardConfigDialog = connect(
    (state) => ({
        dialog: state.dialog,
        board: state.board,
    }),
    mapActionCreatorsToProps({
        close,
        update,
    })
)(Component);