/* eslint react/jsx-sort-props: 0 */

import Color from 'color';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React, { Component, PropTypes, cloneElement } from 'react';
import {
    Circle,
    Ellipse,
    Line,
    Measure,
    Polygon,
    Polyline,
    Rect,
} from '../components/Shape';
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
        backgroundColor: Colors.grey600,
        margin: '0 2px',
    },
    SelectedColor: Colors.pink500,
    Button: {
        flex: '0 0 auto',
        width: 48,
    },
};

const getIconColor = (theme, state) =>
    (state ? theme.palette.accent1Color : theme.palette.textColor);

const ModeButton = ({ name, mode, icon, setMode, theme }) => (
    <IconButton
        iconClassName="material-icons"
        iconStyle={{
            color: getIconColor(theme, name === mode),
        }}
        style={Style.Button}
        onTouchTap={() => setMode(name)}
    >
        {icon}
    </IconButton>
);
ModeButton.propTypes = {
    icon: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setMode: PropTypes.func.isRequired,
    theme: PropTypes.shape({
        palette: PropTypes.object.isRequired,
    }).isRequired,
};

const ShapeButton = ({
    name,
    shape,
    theme,
    icon,
    children,
    setShape,
}) => {
    const color = getIconColor(theme, name === shape);

    if (icon) {
        return (
            <IconButton
                iconClassName="material-icons"
                iconStyle={{ color }}
                style={Style.Button}
                onTouchTap={() => setShape(name)}
            >
                {icon}
            </IconButton>
        );
    }

    return (
        <IconButton style={Style.Button} onTouchTap={() => setShape(name)}>
            <SvgIcon>
                {cloneElement(children, {
                    fill: 'none',
                    stroke: color,
                    strokeWidth: 1,
                })}
            </SvgIcon>
        </IconButton>
    );
};
ShapeButton.propTypes = {
    mode: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    setMode: PropTypes.func.isRequired,
    setShape: PropTypes.func.isRequired,
    shape: PropTypes.string.isRequired,
    theme: PropTypes.shape({
        palette: PropTypes.object.isRequired,
    }).isRequired,
    children: PropTypes.element,
    icon: PropTypes.string,
};

// ToDo: to SFC
// eslint-disable-next-line react/prefer-stateless-function
export class Toolbar extends Component {
    static get contextTypes() {
        return {
            muiTheme: PropTypes.object,
        };
    }

    static get propTypes() {
        return {
            open: PropTypes.func.isRequired,
            setMode: PropTypes.func.isRequired,
            setShape: PropTypes.func.isRequired,
            setSnap: PropTypes.func.isRequired,
            onChangePerspective: PropTypes.func.isRequired,
            onResetZoom: PropTypes.func.isRequired,
            onZoomIn: PropTypes.func.isRequired,
            onZoomOut: PropTypes.func.isRequired,
            fill: PropTypes.bool,
            fillColor: PropTypes.string,
            mode: PropTypes.string,
            perspective: PropTypes.bool,
            shape: PropTypes.string,
            snap: PropTypes.bool,
            stroke: PropTypes.bool,
            strokeColor: PropTypes.string,
            strokeWidth: PropTypes.number,
            style: PropTypes.object,
        };
    }

    render() {
        const {
            fill,
            fillColor,
            stroke,
            strokeColor,
            strokeWidth,
            mode,
            shape,
            snap,
            style,
            open,
            perspective,
            setMode,
            setShape,
            setSnap,
            onResetZoom,
            onChangePerspective,
            onZoomIn,
            onZoomOut,
        } = this.props;
        const menuProps = {
            mode,
            setMode,
        };
        const shapeProps = {
            shape,
            setShape,
        };

        const theme = getMuiTheme(this.context.muiTheme).rawTheme;

        return (
            <Paper
                style={{
                    ...Style.Toolbar,
                    ...style,
                }}
            >
                <IconButton
                    iconClassName="material-icons"
                    onTouchTap={onZoomIn}
                >
                    zoom_in
                </IconButton>
                <IconButton
                    iconClassName="material-icons"
                    onTouchTap={onZoomOut}
                >
                    zoom_out
                </IconButton>
                <FlatButton
                    label="100%"
                    labelStyle={{ paddingLeft: 8, paddingRight: 8 }}
                    style={{ flex: '0 0 auto', minWidth: 0 }}
                    onTouchTap={onResetZoom}
                />
                <FlatButton
                    label="3D"
                    labelStyle={{ paddingLeft: 8, paddingRight: 8 }}
                    style={{ flex: '0 0 auto', minWidth: 0 }}
                    onTouchTap={() => onChangePerspective(!perspective)}
                />
                <div style={Style.Separator} />
                <ModeButton
                    {...menuProps}
                    name={MODE.MOVE}
                    icon="open_with"
                    theme={theme}
                />
                <ModeButton
                    {...menuProps}
                    name={MODE.EDIT}
                    icon="editor"
                    theme={theme}
                />
                <ModeButton
                    {...menuProps}
                    name={MODE.ERASE}
                    icon="delete"
                    theme={theme}
                />
                <div style={Style.Separator} />
                <IconButton
                    iconClassName="material-icons"
                    iconStyle={{
                        color: getIconColor(theme, snap),
                    }}
                    style={Style.Button}
                    onTouchTap={() => setSnap(!snap)}
                >
                    grid_on
                </IconButton>
                {mode === MODE.EDIT ? (
                    <div style={Style.Group}>
                        <div style={Style.Separator} />
                        <ShapeButton
                            {...shapeProps}
                            name={SHAPE.PIECE}
                            icon="place"
                            theme={theme}
                        />
                        <ShapeButton
                            {...shapeProps}
                            name={SHAPE.LINE}
                            theme={theme}
                        >
                            <Line
                                x1={24} x2={0}
                                y1={0} y2={24}
                            />
                        </ShapeButton>
                        <ShapeButton
                            {...shapeProps}
                            name={SHAPE.RECT}
                            theme={theme}
                        >
                            <Rect
                                x={1} y={1}
                                width={22} height={22}
                            />
                        </ShapeButton>
                        <ShapeButton
                            {...shapeProps}
                            name={SHAPE.CIRCLE}
                            theme={theme}
                        >
                            <Circle cx={12} cy={12} r={11} />
                        </ShapeButton>
                        <ShapeButton
                            {...shapeProps}
                            name={SHAPE.ELLIPSE}
                            theme={theme}
                        >
                            <Ellipse
                                cx={12} cy={12}
                                rx={11} ry={6}
                            />
                        </ShapeButton>
                        <ShapeButton
                            {...shapeProps}
                            name={SHAPE.POLYLINE}
                            theme={theme}
                        >
                            <Polyline
                                points={[
                                    { x: 22, y: 2 },
                                    { x: 16, y: 12 },
                                    { x: 22, y: 22 },
                                    { x: 2, y: 22 },
                                    { x: 2, y: 2 },
                                ]}
                            />
                        </ShapeButton>
                        <ShapeButton
                            {...shapeProps}
                            name={SHAPE.POLYGON}
                            theme={theme}
                        >
                            <Polygon
                                points={[
                                    { x: 22, y: 2 },
                                    { x: 16, y: 12 },
                                    { x: 22, y: 22 },
                                    { x: 2, y: 22 },
                                    { x: 2, y: 2 },
                                ]}
                            />
                        </ShapeButton>
                        <ShapeButton
                            {...shapeProps}
                            icon="text_fields"
                            name={SHAPE.TEXT}
                            theme={theme}
                        />
                        <ShapeButton
                            {...shapeProps}
                            name={SHAPE.MEASURE}
                            theme={theme}
                        >
                            <Measure
                                fontSize={10}
                                gridSize={24}
                                x1={0} x2={24}
                                y1={24} y2={0}
                            />
                        </ShapeButton>
                        <div style={Style.Separator} />
                        <IconButton onTouchTap={() => open('editStyle')}>
                            <FontIcon className="material-icons">
                                color_lens
                            </FontIcon>
                            <SvgIcon style={{ marginTop: -24 }}>
                                <Rect
                                    x={8} y={8}
                                    width={14} height={14}
                                    fill={
                                        fill
                                            ? new Color(fillColor).rgbString()
                                            : 'none'
                                    }
                                    stroke={
                                        stroke
                                            ? new Color(strokeColor).rgbString()
                                            : 'none'
                                    }
                                    strokeWidth={strokeWidth}
                                />
                            </SvgIcon>
                        </IconButton>
                    </div>
                ) : null}
            </Paper>
        );
    }
}
