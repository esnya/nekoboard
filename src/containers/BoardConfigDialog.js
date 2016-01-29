import { connect } from 'react-redux';
import { mapStateToProps, mapActionCreatorsToProps } from './Container';
import {
    BoardConfigDialog as Component,
} from '../components/BoardConfigDialog';
import { update } from '../actions/Board';
import { close } from '../actions/Dialog';

export const BoardConfigDialog = connect(
    mapStateToProps('dialog', 'board'),
    mapActionCreatorsToProps({
        close,
        update,
    })
)(Component);