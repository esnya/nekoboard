import {
    IconButton,
    Paper,
    SvgIcon,
    Styles,
} from 'material-ui';
import React from 'react';
import { Line, Rect, Circle, Ellipse, Measure } from '../components/Shape';
import * as MODE from '../constants/Mode';
import * as SHAPE from '../constants/Shape';

const Style = {
    Toolbar: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
    },
    Group: {
        flex: '0 1 auto',
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
    Button: {
        flex: '0 0 48px',
        width: 48,
    },
};

const ModeButton = ({name, mode, icon, setMode}) => (
    <IconButton
        iconClassName="material-icons"
        iconStyle={{
            color: name === mode
                ? Style.SelectedColor
                : null,
        }}
        style={Style.Button}
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
                color: Styles.Colors.grey300,
            };

        return (
            <IconButton
                iconClassName="material-icons"
                iconStyle={style}
                style={Style.Button}
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
            stroke: Styles.Colors.grey300,
            fill: 'none',
        };

    return (
        <IconButton style={Style.Button} onTouchTap={() => setShape(name)}>
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
        snap,
        open,
        setMode,
        setShape,
        setSnap,
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
                icon="delete" />
            <div style={Style.Separator} />
            <IconButton
                iconClassName="material-icons"
                iconStyle={{
                    color: snap ? null : Styles.Colors.grey300,
                }}
                style={Style.Button}
                onTouchTap={() => setSnap(!snap)}>
                grid_on
            </IconButton>
            {mode === MODE.EDIT ? (
                <div style={Style.Group}>
                    <div style={Style.Separator} />
                    <ShapeButton
                        {...shapeProps}
                        name={SHAPE.PIECE}
                        icon="place" />
                    <ShapeButton
                        {...shapeProps}
                        name={SHAPE.LINE}>
                        <Line x1={24} y1={0} x2={0} y2={24} />
                    </ShapeButton>
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
                        name={SHAPE.ELLIPSE}>
                        <Ellipse cx={12} cy={12} rx={11} ry={6} />
                    </ShapeButton>
                    <ShapeButton
                        {...shapeProps}
                        name={SHAPE.TEXT}
                        icon="text_fields" />
                    <ShapeButton
                        {...shapeProps}
                        name={SHAPE.MEASURE}>
                        <Measure
                            x1={0} y1={24} x2={24} y2={0}
                            stroke={
                                shape === SHAPE.MEASURE
                                ? stroke
                                : Styles.Colors.grey300
                            }
                            fill={
                                shape === SHAPE.MEASURE
                                ? fill
                                : Styles.Colors.grey300
                            }
                            fontSize={10}
                            gridSize={24} />
                    </ShapeButton>
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