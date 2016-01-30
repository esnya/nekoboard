import React from 'react';
import * as SHAPE from '../constants/Shape';

export const Rect = ({x, y, width, height, fill, stroke, onTouchTap}) => (
    <rect
        x={x} y={y}
        width={width} height={height}
        stroke={stroke} fill={fill}
        onTouchTap={onTouchTap} />
);

export const Circle = ({cx, cy, r, fill, stroke, onTouchTap}) => (
    <circle
        cx={cx} cy={cy} r={r}
        stroke={stroke} fill={fill}
        onTouchTap={onTouchTap} />
);

export const Text = ({
    x, y,
    width, height,
    text,
    fill, stroke,
    onTouchTap,
}) => (
    <text
        x={x} y={y}
        width={width} height={height}
        fill={fill !== 'none' ? fill : stroke}
        style={{
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            MSUserSelect: 'none',
        }}
        onTouchTap={onTouchTap}>
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