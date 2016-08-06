import _, { range } from 'lodash';
import React, { PropTypes } from 'react';
import pure from '../enhancers/pure';
import styles from '../styles/grid.styl';

const xLabel = (x, step) => String.fromCharCode('A'.charCodeAt(0) + Math.floor(x / step));
const yLabel = (y, step) => `${Math.floor(y / step)}`;

const GridLabels = props => {
    const {
        width,
        height,
        step,
    } = props;

    return (
        <g>
            {
                _(range(0, height, step))
                    .map(y => range(0, width, step).map(x => [x, y]))
                    .flatten()
                    .map(([x, y], i) => (
                        <text
                            className={styles.label}
                            key={i}
                            textAnchor="middle"
                            x={x + step / 2}
                            y={y + step - 4}
                        >
                            {`${xLabel(x, step)}${yLabel(y, step)}`}
                        </text>
                    ))
                    .value()
            }
        </g>
    );
};
GridLabels.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
};
export default pure(GridLabels);
