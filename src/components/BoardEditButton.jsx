import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import staticWrapper from '../enhancers/static';
import * as Actions from '../actions/dialog';

const BoardEditButton = props => {
    const {
        onTouchTap,
        iconColor,
        ...others,
    } = props;

    return (
        <IconButton {...others} onTouchTap={onTouchTap}>
            <Settings color={iconColor} />
        </IconButton>
    );
};
BoardEditButton.propTypes = {
    onTouchTap: PropTypes.func.isRequired,
    iconColor: PropTypes.string,
};
export default compose(
    connect(() => ({}), (dispatch) => ({
        onTouchTap: () => dispatch(Actions.open('config')),
    })),
    staticWrapper
)(BoardEditButton);
