import { connect } from 'react-redux';
import { close } from '../actions/Dialog';
import { add } from '../actions/Shape';
import { PieceDialog as Component } from '../components/piece-dialog';

export const PieceDialog = connect(
    ({ editor, dialog }) => ({
        ...editor,
        ...dialog.piece,
        open: Boolean(dialog.piece),
    }),
    (dispatch) => ({
        onClose: () => dispatch(close('piece')),
        onCreate: (e, data) => {
            dispatch(close('piece'));
            dispatch(add(data));
        },
    })
)(Component);
