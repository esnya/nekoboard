import { connect } from 'react-redux';
import { close } from '../actions/dialog';
import { add } from '../actions/shape';
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
