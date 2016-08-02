/* eslint react/jsx-sort-props: 0 */

import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import * as MODE from '../constants/Mode';
import * as SHAPE from '../constants/Shape';
import { Shape } from './Shape';
import styles from '../styles/canvas.styl';

const GridLine = ({ width, height, step }) => {
    const lines = [];

    for (let x = 0; x < width; x += step) {
        lines.push(
            <line
                key={`x${x}`}
                x1={x} x2={x}
                y1={0} y2={height}
            />
        );
    }
    for (let y = 0; y < height; y += step) {
        lines.push(
            <line
                key={`y${y}`}
                x1={0} x2={width}
                y1={y} y2={y}
            />
        );
    }

    return <g stroke={Colors.grey300}>{lines}</g>;
};

const GridLabel = ({ width, height, step }) => {
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
                    style={{
                        cursor: 'default',
                        userSelect: 'none',
                        MozUserSelect: 'none',
                        WebkitUserSelect: 'none',
                        MsUserSelect: 'none',
                    }}
                    textAnchor="middle"
                    x={x + step / 2} y={y + step - 4}
                >
                    {`${xlabel}${ylabel}`}
                </text>
            );
        }
    }

    return <g fill={Colors.grey300}>{labels}</g>;
};

GridLine.propTypes = GridLabel.propTypes = {
    height: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
};

export class Canvas extends Component {
    static get defaultProps() {
        return {
            zoom: 1,
        };
    }
    static get propTypes() {
        return {
            editor: PropTypes.object.isRequired,
            beginEdit: PropTypes.func.isRequired,
            endEdit: PropTypes.func.isRequired,
            shapes: PropTypes.array.isRequired,
            updateEdit: PropTypes.func.isRequired,
            edit: PropTypes.object,
            grid: PropTypes.bool,
            gridSize: PropTypes.number,
            height: PropTypes.number,
            perspective: PropTypes.bool,
            width: PropTypes.number,
            zoom: PropTypes.number,
        };
    }

    onMouseDownOnShape(e, id) {
        e.preventDefault();

        this.props.beginEdit({
            ...this.toLocalPos(e.nativeEvent),
            id,
        });
    }

    onMouseDown(e) {
        const {
            beginEdit,
        } = this.props;

        beginEdit(this.toLocalPos(e.nativeEvent));
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

    toLocalPos(e) {
        const offset = findDOMNode(this.canvas).getBoundingClientRect();
        const pos = e.touches && e.touches[0] || e;
        const zoom = this.props.zoom;

        /*
        console.log(e.type);
        console.log('local', {
            x: pos.clientX - offset.x,
            y: pos.clientY - offset.y,
        });
        console.log('client', {
            x: pos.clientX,
            y: pos.clientY,
        });
        console.log('layer', {
            x: pos.layerX,
            y: pos.layerY,
        });
        console.log('page', {
            x: pos.pageX,
            y: pos.pageY,
        });
        console.log('offset', offset);
        // */

        return {
            x: (pos.clientX - offset.left) / zoom,
            y: (pos.clientY - offset.top) / zoom,
        };
    }

    render() {
        const {
            edit,
            editor,
            grid,
            gridSize,
            width,
            height,
            perspective,
            shapes,
            zoom,
        } = this.props;

        const gridElements = grid && [
            <GridLine
                key="line"
                step={+gridSize}
                width={width} height={height}
            />,
            <GridLabel
                key="lebel"
                step={+gridSize}
                width={width} height={height}
            />,
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

        const expandShape = editor.mode === MODE.MOVE ||
            editor.mode === MODE.ERASE;

        return (
            <Paper
                className={`${styles.canvas} ${perspective ? styles.perspective : ''}`}
                ref={(c) => c && (this.canvas = c)}
                style={{
                    cursor,
                    width: width * zoom,
                    height: height * zoom,
                }}
                onMouseDown={(e) => this.onMouseDown(e)}
                onMouseMove={(e) => this.onMouseMove(e)}
                onMouseUp={(e) => this.onMouseUp(e)}
                onTouchStart={(e) => this.onMouseDown(e)}
                onTouchMove={(e) => this.onMouseMove(e)}
                onTouchEnd={(e) => this.onMouseUp(e)}
            >
                <svg
                    id="canvas-svg"
                    width={width * zoom}
                    height={height * zoom}
                >
                    <g transform={`scale(${zoom})`}>
                        {gridElements}
                        {
                            shapes
                                .filter((shape) => shape.shape !== SHAPE.PIECE)
                                .map((shape, i) => (
                                    <Shape
                                        {...shape}
                                        expand={expandShape}
                                        gridSize={gridSize}
                                        key={shape.id || i}
                                        perspective={perspective}
                                        style={{
                                            cursor: shapeCursor,
                                        }}
                                        onMouseDown={
                                            (e) => this
                                                .onMouseDownOnShape(e, shape.id)
                                        }
                                        onTouchStart={
                                            (e) => this
                                                .onMouseDownOnShape(e, shape.id)
                                        }
                                    />
                                ))
                        }
                        {
                            shapes
                                .filter((shape) => shape.shape === SHAPE.PIECE)
                                .map((shape, i) => (
                                    <Shape
                                        {...shape}
                                        gridSize={gridSize}
                                        key={shape.id || i}
                                        perspective={perspective}
                                        style={{
                                            cursor: shapeCursor,
                                        }}
                                        onMouseDown={
                                            (e) => this
                                                .onMouseDownOnShape(e, shape.id)
                                        }
                                        onTouchStart={
                                            (e) => this
                                                .onMouseDownOnShape(e, shape.id)
                                        }
                                    />
                                ))
                        }
                        {edit && <Shape {...edit} />}
                    </g>
                </svg>
            </Paper>
        );
    }
}
