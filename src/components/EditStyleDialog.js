import Color from 'color';
import { pick } from 'lodash';
import {
    Dialog,
    FlatButton,
    IconButton,
    SvgIcon,
    TextField,
    Toggle,
} from 'material-ui';
import React, { Component, PropTypes } from 'react';
import ColorPicker from 'react-color';
import { Rect } from './Shape';

export class EditStyleDialog extends Component {
    static get propTypes() {
        return {
            close: PropTypes.func.isRequired,
            editor: PropTypes.object.isRequired,
            dialog: PropTypes.object.isRequired,
            setStyle: PropTypes.func.isRequired,
        };
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

    onHistory(style) {
        const {
            close,
            setStyle,
        } = this.props;
        setStyle(style);
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
            fillColor,
            fontSize,
            stroke,
            strokeColor,
            strokeWidth,
        } = editor;

        const actions = [
            <FlatButton primary
                key="close"
                label="Close"
                onTouchTap={() => close('editStyle')}
            />,
        ];
        const flexStyle = {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
        };
        const fillStyle = {
            flex: '1 1 0',
        };

        return (
            <Dialog
                autoScrollBodyContent
                actions={actions}
                open={!!dialog.editStyle}
                title="Edit Style"
            >
                <div style={{ height: 48 }}>
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
                                                ? Color(style.fillColor)
                                                    .rgbString()
                                                : 'none'
                                        }
                                        height={22}
                                        stroke={
                                            style.stroke
                                                ? Color(style.strokeColor)
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
                <div style={flexStyle}>
                    <div style={fillStyle}>
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
                                    onChangeComplete={({rgb}) =>
                                        this.handleChange(
                                            'strokeColor',
                                            rgb
                                        )
                                    }
                                />
                            ) : null
                        }
                    </div>
                    <div style={fillStyle}>
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
                                    onChangeComplete={({rgb}) =>
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
                <div style={flexStyle}>
                    <TextField fullWidth
                        defaultValue={strokeWidth}
                        floatingLabelText="Stroke Width"
                        style={fillStyle}
                        type="number"
                        onBlur={
                            ({target}) =>
                                this.handleChange('strokeWidth', +target.value)
                        }
                    />
                    <TextField fullWidth
                        defaultValue={fontSize}
                        floatingLabelText="Font Size"
                        style={fillStyle}
                        type="number"
                        onBlur={
                            ({target}) =>
                                this.handleChange('fontSize', +target.value)
                        }
                    />
                </div>
            </Dialog>
        );
    }
}
