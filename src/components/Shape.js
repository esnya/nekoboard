/* eslint react/jsx-sort-props: 0 */

import React, { PropTypes } from 'react';
import * as SHAPE from '../constants/Shape';

const UnselectableText = {
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    MsUserSelect: 'none',
};

export const Line = (props) => (
    <line {...props} />
);

export const Rect = (props) => (
    <rect {...props} />
);

export const Circle = (props) => (
    <circle {...props} />
);

export const Ellipse = (props) => (
    <ellipse {...props} />
);

export const Text = (props) => {
    const {
        x, y,
        cx, cy,
        x1, x2, y1, y2,
        style,
        text,
        fontSize,
        ...otherProps,
    } = props;

    return (
        <text
            {...otherProps}
            x={x || cx || (x1 + x2)}
            y={y || cy || (y1 + y2)}
            style={{
                ...style,
                fontSize,
                ...UnselectableText,
            }}
            textAnchor="middle"
            dominantBaseline="middle"
        >
            {text}
        </text>
    );
};
Text.propTypes = {
    text: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    cx: PropTypes.number,
    cy: PropTypes.number,
    fontSize: PropTypes.number,
    style: PropTypes.object,
    x1: PropTypes.number,
    x2: PropTypes.number,
    y1: PropTypes.number,
    y2: PropTypes.number,
};

export const Piece = (props) => {
    const {
        x, y,
        style,
        ...otherProps,
    } = props;

    return (
        <circle
            {...otherProps}
            cx={x} cy={y}
            r={20}
            style={{
                ...style,
                zIndex: 1000,
            }}
        />
    );
};
Piece.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    style: PropTypes.object,
};

export const Measure = (props) => {
    const {
        x1, x2,
        y1, y2,
        fill,
        stroke,
        fontSize,
        gridSize,
        style,
        ...otherProps,
    } = props;
    const d = {
        x: x2 - x1,
        y: y2 - y1,
    };
    const length = Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.y, 2));
    const deg = Math.atan2(d.y, d.x) * 180 / Math.PI;
    const rotate = `rotate(${deg})`;
    const translate = `translate(${x1}, ${y1})`;
    const label = `${Math.round(length / gridSize * 10) / 10}`;

    return (
        <g
            {...otherProps}
            fill={fill}
            stroke={stroke}
            style={style}
            transform={`${translate} ${rotate}`}
        >
            <line x1={0} y1={0} x2={5} y2={5} />
            <line x1={0} y1={0} x2={5} y2={-5} />
            <line x1={length} y1={0} x2={length - 5} y2={5} />
            <line x1={length} y1={0} x2={length - 5} y2={-5} />
            <line x1={0} y1={0} x2={length} y2={0} />
            <text
                x={length / 2} y={-(fontSize || 12) / 8}
                fill={stroke}
                stroke="none"
                style={{
                    fontSize: fontSize || 12,
                    ...UnselectableText,
                }}
                textAnchor="middle"
            >
                {label}
            </text>
        </g>
    );
};
Measure.propTypes = {
    fontSize: PropTypes.number.isRequired,
    gridSize: PropTypes.number.isRequired,
    x1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    style: PropTypes.object,
};

export const Polyline = (props) => {
    const {
        points,
        x, y,
        ...othreProps,
    } = props;

    return (
        <g transform={`translate(${x || 0},${y || 0})`}>
            <polyline
                {...othreProps}
                points={
                    points && points.map((point) =>
                        `${point.x},${point.y}`
                    ).join(',')
                }
            />
        </g>
    );
};
Polyline.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    })).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

export const Polygon = (props) => {
    const {
        points,
        x, y,
        ...othreProps,
    } = props;

    return (
        <g transform={`translate(${x || 0},${y || 0})`}>
            <polygon
                {...othreProps}
                points={
                    points && points.map((point) =>
                        `${point.x},${point.y}`
                    ).join(',')
                }
            />
        </g>
    );
};
Polygon.propTypes = {
    points: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    })).isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

export const Shapes = {
    [SHAPE.RECT]: Rect,
    [SHAPE.CIRCLE]: Circle,
    [SHAPE.ELLIPSE]: Ellipse,
    [SHAPE.TEXT]: Text,
    [SHAPE.PIECE]: Piece,
    [SHAPE.MEASURE]: Measure,
    [SHAPE.LINE]: Line,
    [SHAPE.POLYLINE]: Polyline,
    [SHAPE.POLYGON]: Polygon,
};

export const Shape = (props) => {
    const {
        expand,
        shape,
        ...otherProps,
    } = props;

    if (!(shape in Shapes)) {
        return <Text {...otherProps} text="??" />;
    }

    const ShapeComponent = Shapes[shape];

    return (
        <g>
            {
                expand ? (
                    <ShapeComponent
                        {...otherProps}
                        fill="none"
                        stroke="transparent"
                        strokeWidth={16}
                    />
                ) : null
            }
            <ShapeComponent {...otherProps} />
        </g>
    );
};
Shape.propTypes = {
    shape: PropTypes.string.isRequired,
    expand: PropTypes.bool,
};
