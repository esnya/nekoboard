import { AppBar, IconButton, LeftNav, MenuItem, Styles } from 'material-ui';
import React, { Component, PropTypes } from 'react';
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

export class App extends Component {
    static get propTypes() {
        return {
            title: PropTypes.string,
            onLoad: PropTypes.func,
            onOpenConfig: PropTypes.func,
            onSave: PropTypes.func,
            onExportSVG: PropTypes.func,
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            leftNav: false,
        };
    }

    handleLeftNavItem(handler) {
        this.setState({leftNav: false});
        if (handler) handler();
    }

    render() {
        const {
            title,
            onOpenConfig,
            onLoad,
            onSave,
            onExportSVG,
        } = this.props;
        const {leftNav} = this.state;

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
                            onTouchTap={onOpenConfig}
                        >
                            settings
                        </IconButton>
                    }
                    title={title || 'Nekoboard'}
                    onLeftIconButtonTouchTap={
                        () => this.setState({leftNav: !leftNav})
                    }
                />
                <LeftNav
                    docked={false}
                    open={leftNav}
                    onRequestChange={(open) => this.setState({leftNav: open})}
                >
                    <MenuItem
                        onTouchTap={() => this.handleLeftNavItem(onLoad)}
                    >
                        Load
                    </MenuItem>
                    <MenuItem
                        onTouchTap={() => this.handleLeftNavItem(onSave)}
                    >
                        Save
                    </MenuItem>
                    <MenuItem
                        onTouchTap={() => this.handleLeftNavItem(onExportSVG)}
                    >
                        Export SVG
                    </MenuItem>
                </LeftNav>
                <div style={Style.CanvasContainer}>
                    <Canvas />
                </div>
                <Toolbar style={{ flex: '0 0 auto' }} />
                <BoardConfigDialog />
                <EditStyleDialog />
                <EditTextDialog />
            </div>
        );
    }
}
