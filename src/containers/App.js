import { connect } from 'react-redux';
import { open } from '../actions/Dialog';
import { App as Component } from '../components/App';
import { mapStateToProps, mapActionCreatorsToProps } from './Container';

export const App = connect(
    mapStateToProps('board'),
    mapActionCreatorsToProps({
        open,
    })
)(Component);