import AppBar from 'material-ui/AppBar';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import pure from '../enhancers/pure';
import DrawerOpenButton from './DrawerOpenButton';
import BoardEditButton from './BoardEditButton';

const BoardAppBar = props => {
    const {
        title,
    } = props;

    return (
        <AppBar
            iconElementLeft={<DrawerOpenButton iconColor="white" />}
            iconElementRight={<BoardEditButton iconColor="white" />}
            title={title || 'Nekoboard'}
        />
    );
};
BoardAppBar.propTypes = {
    title: PropTypes.string,
};
export default compose(
    connect(({ board }) => ({ title: board && board.title })),
    pure
)(BoardAppBar);
