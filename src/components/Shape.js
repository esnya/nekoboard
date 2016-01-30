import React from 'react';
import * as SHAPE from '../constants/Shape';

export const Rect = ({x, y, width, height, fill, stroke}) => (
    <rect
        x={x} y={y}
        width={width} height={height}
        stroke={stroke} fill={fill} />
);

export const Circle = ({cx, cy, r, fill, stroke}) => (
    <circle
        cx={cx} cy={cy} r={r}
        stroke={stroke} fill={fill} />
);

export const Text = ({x, y, width, height, text, fill, stroke}) => (
    <text
        x={x} y={y}
        width={width} height={height}
        fill={fill !== 'none' ? fill : stroke}
        style={{
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            MSUserSelect: 'none',
        }}>
        {text}
    </text>
);

export const Shape = (props) => {
    const {
        shape,
        ...otherProps,
    } = props;

    switch(shape) {
        case SHAPE.RECT:
            return <Rect {...otherProps} />;
        case SHAPE.CIRCLE:
            return <Circle {...otherProps} />;
        case SHAPE.TEXT:
            return <Text {...otherProps} />;
        default:
            return <Text {...otherProps} text="??" />;
    }
};