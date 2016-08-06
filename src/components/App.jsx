import React from 'react';
import { BoardConfigDialog } from '../containers/BoardConfigDialog';
import { EditStyleDialog } from '../containers/EditStyleDialog';
import { EditTextDialog } from '../containers/EditTextDialog';
import { PieceDialog } from '../containers/PieceDialog';
import { Toolbar } from '../containers/Toolbar';
import staticWrapper from '../enhancers/static';
import BoardAppBar from './BoardAppBar';
import BoardDrawer from './BoardDrawer';
import Canvas from './Canvas';
import styles from '../styles/app.styl';

const App = () => (
    <div className={styles.container}>
        <BoardAppBar />
        <BoardDrawer />
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
export default staticWrapper(App);
