import { Dialog, FlatButton, TextField, Toggle } from 'material-ui';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export class EditStyleDialog extends Component {
    static get propTypes() {
        return {
            close: PropTypes.func.isRequired,
            editor: PropTypes.object.isRequired,
            dialog: PropTypes.object.isRequired,
            setStyle: PropTypes.func.isRequired,
        };
    }

    constructor(props) {
        super(props);

        const {
            editor,
        } = props;

        this.state = {
            stroke: !editor || editor.stroke !== 'none',
            fill: !editor || editor.fill !== 'none',
        };
    }

    componentWillUpdate(nextProps) {
        const editor = this.props;
        const nextEditor = nextProps.editor;

        if (!editor && nextEditor && (
            editor.stroke !== nextEditor.stroke ||
                editor.fill !== nextEditor.fill
        )) {
            this.setState({
                stroke: nextEditor.stroke !== 'none',
                fill: nextEditor.fill !== 'none',
            });
        }
    }

    onOK() {
        const {
            close,
            setStyle,
        } = this.props;
        const {
            fill,
            stroke,
        } = this.state;

        setStyle({
            stroke: stroke ? findDOMNode(this.stroke).value : 'none',
            fill: fill ? findDOMNode(this.fill).value : 'none',
            strokeWidth: this.strokeWidth.getValue(),
            fontSize: this.fontSize.getValue(),
        });
        close('editStyle');
    }

    render() {
        const {
            editor,
            dialog,
            close,
        } = this.props;
        const {
            fill,
            stroke,
        } = this.state;

        const actions = [
            <FlatButton primary
                key="ok"
                label="OK"
                onTouchTap={() => this.onOK()}
            />,
            <FlatButton secondary
                key="cancel"
                label="CANCEL"
                onTouchTap={() => close('editStyle')}
            />,
        ];

        return (
            <Dialog
                actions={actions}
                open={!!dialog.editStyle}
                title="Edit Style"
            >
                <div>
                    <Toggle
                        label="Stroke"
                        labelPosition="right"
                        toggled={stroke}
                        onToggle={() => this.setState({stroke: !stroke})}
                    />
                    <input
                        defaultValue={editor.stroke}
                        disabled={!stroke}
                        ref={(c) => c && (this.stroke = c)}
                        type="color"
                    />
                </div>
                <div>
                    <Toggle
                        label="Fill"
                        labelPosition="right"
                        toggled={fill}
                        onToggle={() => this.setState({fill: !fill})}
                    />
                    <input
                        defaultValue={editor.fill}
                        disabled={!fill}
                        ref={(c) => c && (this.fill = c)}
                        type="color"
                    />
                </div>
                <TextField fullWidth
                    defaultValue={editor.strokeWidth}
                    floatingLabelText="Stroke Width"
                    ref={(c) => c && (this.strokeWidth = c)}
                    type="number"
                />
                <TextField fullWidth
                    defaultValue={editor.fontSize}
                    floatingLabelText="Font Size"
                    ref={(c) => c && (this.fontSize = c)}
                    type="number"
                />
            </Dialog>
        );
    }
}