import { AppBar, IconButton } from 'material-ui';
import React from 'react';
import { BoardConfigDialog } from '../containers/BoardConfigDialog';

export const App = ({board, open}) =>
    (
        <div>
            <AppBar
                title={board && board.title || 'Nekoboard'}
                iconElementRight = {
                    <IconButton
                        iconClassName="material-icons"
                        iconStyle={{color: 'white'}}
                        onTouchTap={() => open('config')} >
                        mode_edit
                    </IconButton>
                } />
            <BoardConfigDialog />
        </div>
    );