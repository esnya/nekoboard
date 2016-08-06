import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import staticWrapper from '../enhancers/static';
import * as Actions from '../actions/ui';

const DrawerOpenButton = props => {
    const {
        onOpenDrawer,
        iconColor,
        ...others,
    } = props;

    return (
        <IconButton {...others} onTouchTap={onOpenDrawer}>
            <Menu color={iconColor} />
        </IconButton>
    );
};
DrawerOpenButton.propTypes = {
    onOpenDrawer: PropTypes.func.isRequired,
    iconColor: PropTypes.string,
};
export default compose(
    connect(() => ({}), (dispatch) => ({
        onOpenDrawer: () => dispatch(Actions.openDrawer()),
    })),
    staticWrapper
)(DrawerOpenButton);
