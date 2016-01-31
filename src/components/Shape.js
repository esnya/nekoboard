import React from 'react';
import * as SHAPE from '../constants/Shape';

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
        fill,
        stroke,
        text,
        ...otherProps,
    } = props;

    return (
        <text
            {...otherProps}
            x={x || cx || (x1 + x2)}
            y={y || cy || (y1 + y2)}
            stye={{
                ...style,
                userSelect: 'none',
                MozUserSelect: 'none',
                WebkitUserSelect: 'none',
                MSUserSelect: 'none',
            }}
            stroke={stroke}
            fill={fill !== 'none' ? fill : stroke}
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

export const Shape = (props) => {
    const {
        shape,
        ...otherProps,
    } = props;

    switch(shape) {
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
        default:
            return <Text {...otherProps} text="??" />;
    }
};