import { connect } from 'react-redux';
import { mapActionCreatorsToProps } from './Container';
import {
    BoardConfigDialog as Component,
} from '../components/BoardConfigDialog';
import { update } from '../actions/board';
import { close } from '../actions/dialog';

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
