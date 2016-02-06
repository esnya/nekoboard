import { Paper, Styles } from 'material-ui';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import * as MODE from '../constants/Mode';
import * as SHAPE from '../constants/Shape';
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

        const pos = e.touches && e.touches[0] || e;

        const x = pos.pageX - canvas.offsetLeft + parent.scrollLeft;
        const y = pos.pageY - canvas.offsetTop + parent.scrollTop;

        return {x, y};
    }

    onMouseDown(e, id) {
        const {
            beginEdit,
        } = this.props;

        beginEdit({
            ...this.toLocalPos(e.nativeEvent),
            id,
        });
    }

    onMouseMove(e) {
        const {
            edit,
            updateEdit,
        } = this.props;

        if (edit) {
            e.preventDefault();
            e.stopPropagation();
            updateEdit(this.toLocalPos(e));
        }
    }

    onMouseUp() {
        this.props.endEdit();
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
        if (editor.mode === MODE.EDIT) shapeCursor = 'pointer';
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
                onMouseDown={(e) => this.onMouseDown(e)}
                onMouseMove={(e) => this.onMouseMove(e)}
                onMouseUp={(e) => this.onMouseUp(e)}
                onTouchStart={(e) => this.onMouseDown(e)}
                onTouchMove={(e) => this.onMouseMove(e)}
                onTouchEnd={(e) => this.onMouseUp(e)}>
                <svg width={width} height={height}>
                    {gridElements}
                    {
                        shapes.filter((shape) => shape.shape !== SHAPE.PIECE)
                            .map((shape, i) => (
                                <Shape
                                    {...shape}
                                    key={shape.id || i}
                                    gridSize={gridSize}
                                    style={{
                                        cursor: shapeCursor,
                                    }}
                                    onMouseDown={
                                        (e) => this.onMouseDown(e, shape.id)
                                    }
                                    onTouchStart={
                                        (e) => this.onMouseDown(e, shape.id)
                                    } />
                            ))
                    }
                    {
                        shapes.filter((shape) => shape.shape === SHAPE.PIECE)
                            .map((shape, i) => (
                                <Shape
                                    {...shape}
                                    key={shape.id || i}
                                    gridSize={gridSize}
                                    style={{
                                        cursor: shapeCursor,
                                    }}
                                    onMouseDown={
                                        (e) => this.onMouseDown(e, shape.id)
                                    }
                                    onTouchStart={
                                        (e) => this.onMouseDown(e, shape.id)
                                    } />
                            ))
                    }
                    {edit && <Shape {...edit} />}
                </svg>
            </Paper>
        );
    }
}