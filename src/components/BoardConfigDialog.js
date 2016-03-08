import { FlatButton, Dialog, TextField, Toggle } from 'material-ui';
import React, { Component, PropTypes } from 'react';

export class BoardConfigDialog extends Component {
    static get propTypes() {
        return {
            close: PropTypes.func.isRequired,
            dialog: PropTypes.object.isRequired,
            update: PropTypes.func.isRequired,
            board: PropTypes.object,
        };
    }

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
                        value = this[key].getValue();
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
            <FlatButton primary
                key="update"
                label="Update"
                onTouchTap={(e) => this.onSubmit(e)}
            />,
            <FlatButton secondary
                key="cancel"
                label="Cancel"
                onTouchTap={() => close('config')}
            />,
        ];

        return (
            <Dialog autoScrollBodyContent
                {...otherProps}
                actions={actions}
                open={!!dialog.config}
                title="Board Config"
            >
                <form onSubmit={(e) => this.onSubmit(e)} >
                    <TextField fullWidth isRequired
                        defaultValue={board.title}
                        floatingLabelText="Title"
                        name="title"
                        ref={(c) => c && (this.title = c)}
                    />
                    <TextField fullWidth isRequired
                        defaultValue={board.width}
                        floatingLabelText="Width"
                        name="width"
                        ref={(c) => c && (this.width = c)}
                        type="number"
                    />
                    <TextField fullWidth isRequired
                        defaultValue={board.height}
                        floatingLabelText="Height"
                        name="height"
                        ref={(c) => c && (this.height = c)}
                        type="number"
                    />
                    <div style={{height: 16}} />
                    <Toggle
                        label="Grid"
                        name="grid"
                        ref={(c) => c && (this.grid = c)}
                        toggled={this.state.grid}
                        onToggle={() => this.onToggle('grid')}
                    />
                    <TextField fullWidth isRequired
                        defaultValue={board.gridSize}
                        floatingLabelText="Grid Size"
                        name="gridSize"
                        ref={(c) => c && (this.gridSize = c)}
                        type="number"
                    />
                </form>
            </Dialog>
        );
    }
}
