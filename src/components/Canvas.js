import { Paper, Styles } from 'material-ui';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import * as MODE from '../constants/Mode';
import { Shape } from './Shape';

const GridLine = ({width, height, step}) => {
    const lines = [];

    for (let x = 0; x < width; x += step) {
        lines.push(
            <line key={`x${x}`} x1={x} y1={0} x2={x} y2={height} />
        );
    }
    for (let y = 0; y < height; y += step) {
        lines.push(
            <line key={`y${y}`} x1={0} y1={y} x2={width} y2={y} />
        );
    }

    return <g stroke={Styles.Colors.grey300}>{lines}</g>;
};

const GridLabel = ({width, height, step}) => {
    const labels = [];

    for (let y = 0; y < height; y += step) {
        const ylabel = Math.floor(y / step + 1);

        for (let x = 0; x < width; x += step) {
            const xlabel = String.fromCharCode(
                'A'.charCodeAt(0) + Math.floor(x / step)
            );

            labels.push(
                <text
                    key={`${y}${x}`}
                    x={x + step / 2} y={y + step - 4}
                    textAnchor="middle"
                    style={{
                        cursor: 'default',
                        userSelect: 'none',
                        MozUserSelect: 'none',
                        WebkitUserSelect: 'none',
                        MsUserSelect: 'none',
                    }}>
                    {`${xlabel}${ylabel}`}
                </text>
            );
        }
    }

    return <g fill={Styles.Colors.grey300}>{labels}</g>;
};

const Style = {
    display: 'inline-block',
    margin: 32,
};

export class Canvas extends Component {
    toLocalPos(e) {
        const canvas = findDOMNode(this.refs.canvas);
        const parent = canvas.parentElement;

        const x = e.pageX - canvas.offsetLeft + parent.scrollLeft;
        const y = e.pageY - canvas.offsetTop + parent.scrollTop;

        return {x, y};
    }

    onMouseMove(e) {
        const {
            edit,
            updateEdit,
        } = this.props;

        if (edit) {
            updateEdit(this.toLocalPos(e));
        }
    }

    onTouchTap(e, id) {
        e.stopPropagation();
        this.props.beginEdit({
            ...this.toLocalPos(e.nativeEvent),
            id,
        });
    }

    render() {
        const {
            edit,
            editor,
            grid,
            gridSize,
            width,
            height,
            shapes,
        } = this.props;

        const gridElements = grid && [
            <GridLine
                key="line"
                width={width}
                height={height}
                step={+gridSize} />,
            <GridLabel
                key="lebel"
                width={width}
                height={height}
                step={+gridSize} />,
        ] || null;

        let cursor = 'auto';

        if (editor.mode === MODE.EDIT) cursor = 'crosshair';
        else if (editor.mode === MODE.MOVE && editor.edit) {
            cursor = 'move';
        }

        let shapeCursor = 'auto';
        if (editor.mode === MODE.EDIT) shapeCursor = 'crosshair';
        else if (editor.mode === MODE.MOVE) shapeCursor = 'move';
        else if (editor.mode === MODE.ERASE) {
            shapeCursor = 'pointer';
        }

        return (
            <Paper
                ref="canvas"
                style={{
                    ...Style,
                    cursor,
                    width,
                    height,
                }}
                onMouseMove={(e) => this.onMouseMove(e)}
                onTouchTap={(e) => this.onTouchTap(e)}>
                <svg width={width} height={height}>
                    {gridElements}
                    {shapes.map((shape, i) => (
                        <Shape
                            {...shape}
                            key={i}
                            style={{
                                cursor: shapeCursor,
                            }}
                            onTouchTap={(e) => this.onTouchTap(e, shape.id)} />
                    ))}
                    {edit && <Shape {...edit} />}
                </svg>
            </Paper>
        );
    }
}