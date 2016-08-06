import { connect } from 'react-redux';
import { close } from '../actions/dialog';
import { setStyle, pushHistory as onPushHistory } from '../actions/editor';
import { EditStyleDialog as Component } from '../components/EditStyleDialog';
import { mapStateToProps, mapActionCreatorsToProps } from './Container';

export const EditStyleDialog = connect(
    mapStateToProps('editor', 'dialog'),
    mapActionCreatorsToProps({
        setStyle,
        close,
        onPushHistory,
    })
)(Component);
