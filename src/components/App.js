import { AppBar, IconButton, Styles } from 'material-ui';
import React from 'react';
import { BoardConfigDialog } from '../containers/BoardConfigDialog';
import { Canvas } from '../containers/Canvas';

const Style = {
    Container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Styles.Colors.grey300,
        height: '100%',
    },
    CanvasContainer: {
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
    },
};

export const App = ({title, open}) => {
    document.title = title
        ? `${title} - Nekoboard`
        : 'Nekoboard';

    return (
        <div style={Style.Container}>
            <AppBar
                title={title || 'Nekoboard'}
                iconElementRight = {
                    <IconButton
                        iconClassName="material-icons"
                        iconStyle={{color: 'white'}}
                        onTouchTap={() => open('config')} >
                        settings
                    </IconButton>
                } />
            <div style={Style.CanvasContainer} >
                <Canvas />
            </div>
            <BoardConfigDialog />
        </div>
    );
};