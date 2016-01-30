import {
    IconButton,
    Paper,
    SvgIcon,
    Styles,
} from 'material-ui';
import React from 'react';
import { Rect, Circle } from '../components/Shape';
import * as MODE from '../constants/Mode';
import * as SHAPE from '../constants/Shape';

const Style = {
    Toolbar: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    Separator: {
        flex: '0 0 1px',
        height: 24,
        backgroundColor: Styles.Colors.grey600,
        margin: '0 2px',
    },
    SelectedColor: Styles.Colors.pink500,
};

const ModeButton = ({name, mode, icon, setMode}) => (
    <IconButton
        iconClassName="material-icons"
        iconStyle={{
            color: name === mode
                ? Style.SelectedColor
                : null,
        }}
        onTouchTap={() => setMode(name)}>
        {icon}
    </IconButton>
);

const ShapeButton = ({name, shape, icon, children, setShape}) => {
    if (icon) {
        const style = {
            color: name === shape
                ? Style.SelectedColor
                : null,
        };

        return (
            <IconButton
                iconClassName="material-icons"
                iconStyle={style}
                onTouchTap={() => setShape(name)}>
                {icon}
            </IconButton>
        );
    }

    const svgStyle = {
        stroke: name === shape
            ? Style.SelectedColor
            : 'black',
        fill: 'none',
    };

    return (
        <IconButton onTouchTap={() => setShape(name)}>
            <SvgIcon>
                <g style={svgStyle}>
                    {children}
                </g>
            </SvgIcon>
        </IconButton>
    );
};

export const Toolbar = ({mode, shape, setMode, setShape}) => (
    <Paper style={Style.Toolbar}>
        <ModeButton
            mode={mode}
            name={MODE.MOVE}
            icon="open_with"
            setMode={setMode} />
        <ModeButton
            mode={mode}
            name={MODE.EDIT}
            icon="editor"
            setMode={setMode} />
        <ModeButton
            mode={mode}
            name={MODE.ERASE}
            icon="clear"
            setMode={setMode} />
        <div style={Style.Separator} />
        <IconButton iconClassName="material-icons">
            color_lens
        </IconButton>
        {mode === MODE.EDIT ? (
            <div style={Style.Toolbar}>
                <div style={Style.Separator} />
                <ShapeButton
                    name={SHAPE.RECT}
                    shape={shape} setShape={setShape}>
                    <Rect x={0} y={0} width={24} height={24} />
                </ShapeButton>
                <ShapeButton
                    name={SHAPE.CIRCLE}
                    shape={shape} setShape={setShape}>
                    <Circle cx={12} cy={12} r={11} />
                </ShapeButton>
                <ShapeButton
                    name={SHAPE.TEXT}
                    icon="text_fields"
                    shape={shape} setShape={setShape} />
            </div>
    ) : null}
    </Paper>
);