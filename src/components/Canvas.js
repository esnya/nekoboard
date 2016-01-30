import { Paper, Styles } from 'material-ui';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import * as SHAPE from '../constants/Shape';
import { Shape } from './Shape';

const Style = {
    display: 'inline-block',
    margin: 32,
};

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
                        userSelect: 'none',
                        MozUserSelect: 'none',
                        WebkitUserSelect: 'none',
                        MSUserSelect: 'none',
                    }}>
                    {`${xlabel}${ylabel}`}
                </text>
            );
        }
    }

    return <g fill={Styles.Colors.grey300}>{labels}</g>;
};

export class Canvas extends Component {
    toLocalPos(e) {
        const canvas = findDOMNode(this.refs.canvas);
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;

        return [x, y];
    }

    onMouseDown(e) {
        const {
            shape,
            beginEdit,
            open,
        } = this.props;
        const pos = this.toLocalPos(e);

        if (shape === SHAPE.TEXT) {
            open('editText', pos);
        } else {
            beginEdit(...pos);
        }
    }

    onMouseMove(e) {
        const {
            edit,
            updateEdit,
        } = this.props;

        if (edit) {
            updateEdit(...this.toLocalPos(e));
        }
    }

    onMouseUp(e) {
        const {
            edit,
            endEdit,
            push,
        } = this.props;

        if (edit) {
            push(edit);
            endEdit(...this.toLocalPos(e));
        }
    }

    onMouseLeave() {
        const {
            edit,
            cancelEdit,
        } = this.props;

        if (edit) {
            cancelEdit();
        }
    }

    render() {
        const {
            width,
            height,
            grid,
            gridSize,
            edit,
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

        return (
            <Paper
                ref="canvas"
                style={{...Style, width, height}}
                onMouseDown={(e) => this.onMouseDown(e)}
                onMouseMove={(e) => this.onMouseMove(e)}
                onMouseUp={(e) => this.onMouseUp(e)}
                onMouseLeave={(e) => this.onMouseLeave(e)}>
                <svg width={width} height={height}>
                    {gridElements}
                    {shapes.map((shape, i) => <Shape key={i} {...shape} />)}
                    {edit && <Shape {...edit} />}
                </svg>
            </Paper>
        );
    }
}