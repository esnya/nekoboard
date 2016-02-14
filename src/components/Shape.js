import React from 'react';
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
            dominantBaseline="middle">
            {text}
        </text>
    );
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
            transform={`${translate} ${rotate}`}>
            <line x1={0} y1={0} x2={5} y2={5} />
            <line x1={0} y1={0} x2={5} y2={-5} />
            <line x1={length} y1={0} x2={length - 5} y2={5} />
            <line x1={length} y1={0} x2={length - 5} y2={-5} />
            <line x1={0} y1={0} x2={length} y2={0} />
            <text
                x={length / 2} y={-(fontSize || 12) / 8}
                fill={stroke === 'none' ? fill : stroke}
                stroke="none"
                style={{
                    fontSize: fontSize || 12,
                    ...UnselectableText,
                }}
                textAnchor="middle">
                {label}
            </text>
        </g>
    );
};

export const Shape = (props) => {
    const {
        shape,
        ...otherProps,
    } = props;

    switch (shape) {
        case SHAPE.LINE:
            return <Line {...otherProps} />;
        case SHAPE.RECT:
            return <Rect {...otherProps} />;
        case SHAPE.CIRCLE:
            return <Circle {...otherProps} />;
        case SHAPE.ELLIPSE:
            return <Ellipse {...otherProps} />;
        case SHAPE.TEXT:
            return <Text {...otherProps} />;
        case SHAPE.PIECE:
            return <Piece {...otherProps} />;
        case SHAPE.MEASURE:
            return <Measure {...otherProps} />;
        default:
            return <Text {...otherProps} text="??" />;
    }
};