import { FlatButton, Dialog, TextField, Toggle } from 'material-ui';
import React, { Component } from 'react';

export class BoardConfigDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: props.board && props.board.grid,
        };
    }

    componentWillUpdate(nextProps) {
        const next = nextProps.board;
        const prev = this.props.board;

        if (!prev || next && next.grid !== prev.grid) {
            this.setState({
                grid: next.grid,
            });
        }
    }

    onToggle(name) {
        this.setState({
            [name]: !this.state[name],
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const data = ['title', 'width', 'height', 'grid', 'gridSize']
            .reduce((result, key) => {
                let value;

                switch (key) {
                    case 'grid':
                        value = this.state[key];
                        break;
                    default:
                        value = this.refs[key].getValue();
                }

                result[key] = value;
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
            dialog,
            close,
            ...otherProps,
        } = this.props;
        const board = this.props.board || {};

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
                autoScrollBodyContent={true}
                title="Board Config"
                open={!!dialog.config} >
                <form onSubmit={(e) => this.onSubmit(e)} >
                    <TextField
                        ref="title"
                        name="title"
                        floatingLabelText="Title"
                        fullWidth={true}
                        defaultValue={board.title}
                        isRequired={true} />
                    <TextField
                        ref="width"
                        name="width"
                        floatingLabelText="Width"
                        fullWidth={true}
                        type="number"
                        defaultValue={board.width}
                        isRequired={true} />
                    <TextField
                        ref="height"
                        name="height"
                        floatingLabelText="Height"
                        fullWidth={true}
                        type="number"
                        defaultValue={board.height}
                        isRequired={true} />
                    <div style={{height: 16}} />
                    <Toggle
                        ref="grid"
                        name="grid"
                        label="Grid"
                        toggled={this.state.grid}
                        onToggle={() => this.onToggle('grid')} />
                    <TextField
                        ref="gridSize"
                        name="gridSize"
                        floatingLabelText="Grid Size"
                        fullWidth={true}
                        type="number"
                        defaultValue={board.gridSize}
                        isRequired={true} />
                </form>
            </Dialog>
        );
    }
}