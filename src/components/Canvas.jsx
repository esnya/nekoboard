/* eslint react/jsx-sort-props: 0 */

import Paper from 'material-ui/Paper';
import React, { PureComponent, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/editor';
import * as MODE from '../constants/Mode';
import * as SHAPE from '../constants/Shape';
import { toEventHandlers } from '../utility/actions';
import { Shape } from './Shape';
import Grid from './Grid';
import styles from '../styles/canvas.styl';

class Canvas extends PureComponent {
    static get defaultProps() {
        return {
            zoom: 1,
        };
    }
    static get propTypes() {
        return {
            editor: PropTypes.object.isRequired,
            shapes: PropTypes.array.isRequired,
            onBeginEdit: PropTypes.func.isRequired,
            onEndEdit: PropTypes.func.isRequired,
            onUpdateEdit: PropTypes.func.isRequired,
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

        this.props.onBeginEdit({
            ...this.toLocalPos(e.nativeEvent),
            id,
        });
    }

    onMouseDown(e) {
        this.props.onBeginEdit(this.toLocalPos(e.nativeEvent));
    }

    onMouseMove(e) {
        const {
            edit,
            onUpdateEdit,
        } = this.props;

        if (edit) {
            e.preventDefault();
            e.stopPropagation();
            onUpdateEdit(this.toLocalPos(e));
        }
    }

    onMouseUp() {
        this.props.onEndEdit();
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
                    width: width * zoom || 0,
                    height: height * zoom || 0,
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
                    width={width * zoom || 0}
                    height={height * zoom || 0}
                >
                    <g transform={`scale(${zoom})`}>
                        {grid ? <Grid width={width} height={height} step={+gridSize} /> : null}
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
export default connect(
    (state) => ({
        ...state.board,
        editor: state.editor,
        edit: state.editor.edit,
        move: state.editor.move,
        perspective: state.view.perspective,
        shape: state.editor.shape,
        shapes: state.shapes,
        zoom: state.view.zoom,
    }),
    dispatch => bindActionCreators(toEventHandlers(Actions), dispatch)
)(Canvas);
