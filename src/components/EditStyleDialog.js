import { Dialog, FlatButton, Toggle } from 'material-ui';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

export class EditStyleDialog extends Component {
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
            editor.stroke !== nextEditor.stroke
            || editor.fill !== nextEditor.fill
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

        setStyle(
            stroke ? findDOMNode(this.refs.stroke).value : 'none',
            fill ? findDOMNode(this.refs.fill).value : 'none'
        );
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
            (
                <FlatButton
                    label="OK"
                    primary={true}
                    onTouchTap={() => this.onOK()} />
            ),
            (
                <FlatButton
                    label="CANCEL"
                    secondary={true}
                    onTouchTap={() => close('editStyle')} />
            ),
        ];

        return (
            <Dialog
                actions={actions}
                title="Edit Style"
                open={!!dialog.editStyle}>
                <div>
                    <Toggle
                        label="Stroke"
                        labelPosition="right"
                        toggled={stroke}
                        onToggle={() => this.setState({stroke: !stroke})} />
                    <input
                        ref="stroke"
                        type="color"
                        defaultValue={editor.stroke}
                        disabled={!stroke} />
                </div>
                <div>
                    <Toggle
                        label="Fill"
                        labelPosition="right"
                        toggled={fill}
                        onToggle={() => this.setState({fill: !fill})} />
                    <input
                        ref="fill"
                        type="color"
                        defaultValue={editor.fill}
                        disabled={!fill} />
                </div>
            </Dialog>
        );
    }
}