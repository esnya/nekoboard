import { connect } from 'react-redux';
import { Canvas as Component } from '../components/Canvas';

export const Canvas = connect(
    (state) => ({
        ...state.board,
    })
)(Component);