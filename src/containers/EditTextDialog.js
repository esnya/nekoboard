import { connect } from 'react-redux';
import { close } from '../actions/Dialog';
import { push } from '../actions/Shape';
import { EditTextDialog as Component } from '../components/EditTextDialog';
import { mapStateToProps, mapActionCreatorsToProps } from './Container';

export const EditTextDialog = connect(
    mapStateToProps('dialog', 'editor'),
    mapActionCreatorsToProps({
        close,
        push,
    })
)(Component);