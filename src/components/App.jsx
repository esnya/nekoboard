import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import React, { Component, PropTypes } from 'react';
import { Canvas } from '../containers/Canvas';
import { BoardConfigDialog } from '../containers/BoardConfigDialog';
import { EditStyleDialog } from '../containers/EditStyleDialog';
import { EditTextDialog } from '../containers/EditTextDialog';
import { PieceDialog } from '../containers/piece-dialog';
import { Toolbar } from '../containers/Toolbar';
import styles from '../styles/app.styl';

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
        this.setState({ leftNav: false });
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
        const { leftNav } = this.state;

        document.title = title
            ? `${title} - Nekoboard`
            : 'Nekoboard';

        return (
            <div className={styles.container}>
                <AppBar
                    showMenuIconButton
                    iconElementRight={
                        <IconButton
                            iconClassName="material-icons"
                            iconStyle={{ color: 'white' }}
                            onTouchTap={onOpenConfig}
                        >
                            settings
                        </IconButton>
                    }
                    title={title || 'Nekoboard'}
                    onLeftIconButtonTouchTap={
                        () => this.setState({ leftNav: !leftNav })
                    }
                />
                <Drawer
                    docked={false}
                    open={leftNav}
                    onRequestChange={(open) => this.setState({ leftNav: open })}
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
                </Drawer>
                <div className={styles.canvas}>
                    <Canvas />
                </div>
                <Toolbar />
                <BoardConfigDialog />
                <EditStyleDialog />
                <EditTextDialog />
                <PieceDialog />
            </div>
        );
    }
}
