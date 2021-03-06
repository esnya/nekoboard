import Color from 'color';
import { pick } from 'lodash';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import React, { PureComponent, PropTypes } from 'react';
import ColorPicker from 'react-color';
import { Rect } from './Shape';
import styles from '../styles/editStyleDialog.styl';

export class EditStyleDialog extends PureComponent {
    static get propTypes() {
        return {
            close: PropTypes.func.isRequired,
            editor: PropTypes.object.isRequired,
            dialog: PropTypes.object.isRequired,
            setStyle: PropTypes.func.isRequired,
            onPushHistory: PropTypes.func.isRequired,
        };
    }

    onHistory(style) {
        const {
            setStyle,
        } = this.props;
        setStyle(style);
        this.handleClose();
    }

    handleChange(key, value) {
        const {
            editor,
            setStyle,
        } = this.props;

        setStyle({
            ...pick(editor, [
                'fill',
                'fillColor',
                'fontSize',
                'stroke',
                'strokeColor',
                'strokeWidth',
            ]),
            [key]: value,
        });
    }

    handleClose() {
        const {
            close,
            onPushHistory,
        } = this.props;

        close('editStyle');
        onPushHistory();
    }

    render() {
        const {
            editor,
            dialog,
        } = this.props;
        const {
            fill,
            fillColor,
            fontSize,
            stroke,
            strokeColor,
            strokeWidth,
        } = editor;

        const actions = [
            <FlatButton
                primary
                key="close"
                label="Close"
                onTouchTap={() => this.handleClose()}
            />,
        ];

        return (
            <Dialog
                autoScrollBodyContent
                actions={actions}
                open={!!dialog.editStyle}
                title="Edit Style"
                onRequestClose={() => this.handleClose()}
            >
                <div className={styles.history}>
                    {
                        editor.styleHistory.map((style, i) => (
                            <IconButton
                                key={i}
                                onTouchTap={() => this.onHistory(style)}
                            >
                                <SvgIcon>
                                    <Rect
                                        {...style}
                                        fill={
                                            style.fill
                                                ? new Color(style.fillColor)
                                                    .rgbString()
                                                : 'none'
                                        }
                                        height={22}
                                        stroke={
                                            style.stroke
                                                ? new Color(style.strokeColor)
                                                    .rgbString()
                                                : 'none'
                                        }
                                        width={22}
                                        x={1} y={1}
                                    />
                                </SvgIcon>
                            </IconButton>
                        ))
                    }
                </div>
                <div className={styles.colorPickerContainer}>
                    <div className={styles.colorPicker}>
                        <Toggle
                            label="Stroke"
                            labelPosition="right"
                            toggled={stroke}
                            onToggle={
                                () => this.handleChange('stroke', !stroke)
                            }
                        />
                        {
                            stroke ? (
                                <ColorPicker
                                    color={strokeColor}
                                    type="sketch"
                                    onChangeComplete={({ rgb }) =>
                                        this.handleChange(
                                            'strokeColor',
                                            rgb
                                        )
                                    }
                                />
                            ) : null
                        }
                    </div>
                    <div className={styles.colorPicker}>
                        <Toggle
                            label="Fill"
                            labelPosition="right"
                            toggled={fill}
                            onToggle={() => this.handleChange('fill', !fill)}
                        />
                        {
                            fill ? (
                                <ColorPicker
                                    color={fillColor}
                                    type="sketch"
                                    onChangeComplete={({ rgb }) =>
                                        this.handleChange(
                                            'fillColor',
                                            rgb
                                        )
                                    }
                                />
                            ) : null
                        }
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <TextField
                        fullWidth
                        className={styles.input}
                        defaultValue={strokeWidth}
                        floatingLabelText="Stroke Width"
                        type="number"
                        onBlur={
                            ({ target }) =>
                                this.handleChange('strokeWidth', +target.value)
                        }
                    />
                    <TextField
                        fullWidth
                        className={styles.input}
                        defaultValue={fontSize}
                        floatingLabelText="Font Size"
                        type="number"
                        onBlur={
                            ({ target }) =>
                                this.handleChange('fontSize', +target.value)
                        }
                    />
                </div>
            </Dialog>
        );
    }
}
