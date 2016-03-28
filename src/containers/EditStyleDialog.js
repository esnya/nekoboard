import {connect} from 'react-redux';
import {close} from '../actions/Dialog';
import {setStyle, pushHistory as onPushHistory} from '../actions/Editor';
import {EditStyleDialog as Component} from '../components/EditStyleDialog';
import {mapStateToProps, mapActionCreatorsToProps} from './Container';

export const EditStyleDialog = connect(
    mapStateToProps('editor', 'dialog'),
    mapActionCreatorsToProps({
        setStyle,
        close,
        onPushHistory,
    })
)(Component);
