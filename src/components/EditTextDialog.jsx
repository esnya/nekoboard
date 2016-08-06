import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import React, { PureComponent, PropTypes } from 'react';

export class EditTextDialog extends PureComponent {
    static get propTypes() {
        return {
            add: PropTypes.func.isRequired,
            close: PropTypes.func.isRequired,
            dialog: PropTypes.object.isRequired,
            editor: PropTypes.object.isRequired,
        };
    }

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
            text: this.text.getValue(),
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
                primary
                key="ok"
                label="OK"
                onTouchTap={() => this.onOK()}
            />,
            <FlatButton
                secondary
                key="cancel"
                label="CANCEL"
                onTouchTap={() => close('editText')}
            />,
        ];

        return (
            <Dialog
                autoScrollBodyContent
                actions={actions}
                open={!!dialog.editText}
                title="Text"
            >
                <TextField fullWidth ref={(c) => c && (this.text = c)} />
            </Dialog>
        );
    }
}
