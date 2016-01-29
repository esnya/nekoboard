import { FlatButton, Dialog, TextField } from 'material-ui';
import React, { Component } from 'react';

export class BoardConfigDialog extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit(e) {
        e.preventDefault();

        const data = ['title'].reduce((result, key) => {
            result[key] = this.refs[key].getValue();
            return result;
        }, {});

        const {
            board,
            close,
            update,
        } = this.props;

        update({
            ...board,
            ...data,
        });

        close('config');
    }

    render() {
        const {
            board,
            dialog,
            close,
            ...otherProps,
        } = this.props;

        const actions = [
            <FlatButton
                label="Update"
                primary={true}
                keyboardFocused={true}
                onTouchTap={(e) => this.onSubmit(e)}
            />,
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={() => close('config')}
            />,
        ];

        return (
            <Dialog
                {...otherProps}
                actions={actions}
                title="Board Config"
                open={dialog.config} >
                <form onSubmit={(e) => this.onSubmit(e)} >
                    <TextField
                        ref="title"
                        name="title"
                        floatingLabelText="Title"
                        fullWidth={true}
                        defaultValue={board && board.title}
                        isRequired={true} />
                </form>
            </Dialog>
        );
    }
}