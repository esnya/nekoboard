import { AppBar, IconButton, Styles } from 'material-ui';
import React, { PropTypes } from 'react';
import { Canvas } from '../containers/Canvas';
import { BoardConfigDialog } from '../containers/BoardConfigDialog';
import { EditStyleDialog } from '../containers/EditStyleDialog';
import { EditTextDialog } from '../containers/EditTextDialog';
import { Toolbar } from '../containers/Toolbar';

const Style = {
    Container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Styles.Colors.grey300,
        height: '100%',
    },
    CanvasContainer: {
        flex: '1 1 auto',
        textAlign: 'center',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
    },
};

export const App = ({title, open}) => {
    document.title = title
        ? `${title} - Nekoboard`
        : 'Nekoboard';

    return (
        <div style={Style.Container}>
            <AppBar
                showMenuIconButton
                iconElementRight={
                    <IconButton
                        iconClassName="material-icons"
                        iconStyle={{color: 'white'}}
                        onTouchTap={() => open('config')}
                    >
                        settings
                    </IconButton>
                }
                title={title || 'Nekoboard'}
            />
            <div style={Style.CanvasContainer}>
                <Canvas />
            </div>
            <Toolbar style={{ flex: '0 0 auto' }} />
            <BoardConfigDialog />
            <EditStyleDialog />
            <EditTextDialog />
        </div>
    );
};
App.propTypes = {
    open: PropTypes.func.isRequired,
    title: PropTypes.string,
};
