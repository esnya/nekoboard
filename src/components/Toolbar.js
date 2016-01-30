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

const ShapeButton = ({
    name,
    shape,
    fill,
    stroke,
    icon,
    children,
    setShape,
}) => {
    if (icon) {
        const style = name === shape
            ? {
                color: fill === 'none' ? stroke : fill,
            } : {
                color: Styles.Colors.grey500,
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

    const svgStyle = name === shape
        ? {
            stroke,
            fill,
        } : {
            stroke: Styles.Colors.grey500,
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

export const Toolbar = (props) => {
    const {
        mode,
        shape,
        fill,
        stroke,
        open,
        setMode,
        setShape,
    } = props;
    const menuProps = {
        mode,
        setMode,
    };
    const shapeProps = {
        shape,
        fill,
        stroke,
        setShape,
    };

    return (
        <Paper style={Style.Toolbar}>
            <ModeButton
                {...menuProps}
                name={MODE.MOVE}
                icon="open_with" />
            <ModeButton
                {...menuProps}
                name={MODE.EDIT}
                icon="editor" />
            <ModeButton
                {...menuProps}
                name={MODE.ERASE}
                icon="clear" />
            {mode === MODE.EDIT ? (
                <div style={Style.Toolbar}>
                    <div style={Style.Separator} />
                    <ShapeButton
                        {...shapeProps}
                        name={SHAPE.RECT}>
                        <Rect x={0} y={0} width={24} height={24} />
                    </ShapeButton>
                    <ShapeButton
                        {...shapeProps}
                        name={SHAPE.CIRCLE}>
                        <Circle cx={12} cy={12} r={11} />
                    </ShapeButton>
                    <ShapeButton
                        {...shapeProps}
                        name={SHAPE.TEXT}
                        icon="text_fields" />
                <div style={Style.Separator} />
                <IconButton
                    iconClassName="material-icons"
                    onTouchTap={() => open('editStyle')}>
                    color_lens
                </IconButton>
                </div>
        ) : null}
        </Paper>
    );
};