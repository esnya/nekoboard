import { Dialog, TextField, FlatButton } from 'material-ui';
import React, { Component } from 'react';

export class EditTextDialog extends Component {
    onOK() {
        const {
            editor,
            dialog,
            close,
            push,
        } = this.props;

        push({
            shape: editor.shape,
            x: dialog.editText.x,
            y: dialog.editText.y,
            text: this.refs.text.getValue(),
            fill: editor.fill,
            stroke: editor.stroke,
        });
        close('editText');
    }

    render() {
        const {
            dialog,
            close,
        } = this.props;

        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onTouchTap={() => this.onOK()} />,
            <FlatButton
                label="CANCEL"
                secondary={true}
                onTouchTap={() => close('editText')} />,
        ];

        return (
            <Dialog
                actions={actions}
                open={!!dialog.editText}
                title="Text">
                <TextField ref="text" fullWidth={true} />
            </Dialog>
        );
    }
}