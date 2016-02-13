import { Dialog, TextField, FlatButton } from 'material-ui';
import React, { Component } from 'react';

export class EditTextDialog extends Component {
    onOK() {
        const {
            editor,
            dialog,
            close,
            add,
        } = this.props;

        add({
            shape: editor.shape,
            x: dialog.editText.x,
            y: dialog.editText.y,
            text: this.refs.text.getValue(),
            fill: editor.fill,
            stroke: editor.stroke,
            strokeWidth: editor.strokeWidth,
            fontSize: editor.fontSize,
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