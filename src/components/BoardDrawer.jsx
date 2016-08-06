import { pick } from 'lodash';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as UIActions from '../actions/ui';
import * as FileActions from '../actions/file';
import pure from '../enhancers/pure';
import UI from '../records/UI';
import { toEventHandlers } from '../utility/actions';

const BoardDrawer = props => {
    const {
        ui,
        onDrawer,
        onLoad,
        onSave,
        onExportSVG,
    } = props;

    return (
        <Drawer
            docked={false}
            open={ui.get('drawer')}
            onRequestChange={onDrawer}
        >
            <MenuItem
                onTouchTap={onLoad}
            >
                Load
            </MenuItem>
            <MenuItem
                onTouchTap={onSave}
            >
                Save
            </MenuItem>
            <MenuItem
                onTouchTap={onExportSVG}
            >
                Export SVG
            </MenuItem>
        </Drawer>
    );
};
BoardDrawer.propTypes = {
    ui: PropTypes.instanceOf(UI).isRequired,
    onDrawer: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onExportSVG: PropTypes.func.isRequired,
};
export default compose(
    connect(
        state => pick(state, 'ui'),
        dispatch => bindActionCreators(
            toEventHandlers({
                ...UIActions,
                ...FileActions,
            }),
            dispatch
        )
    ),
    pure
)(BoardDrawer);
