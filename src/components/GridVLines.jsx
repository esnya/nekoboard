import { range } from 'lodash';
import React, { PropTypes } from 'react';
import pure from '../enhancers/pure';

const GridVLines = props => {
    const {
        width,
        height,
        step,
    } = props;

    return (
        <g>
            {
                range(0, width, step)
                    .map((x, i) => <line key={i} x1={x} x2={x} y1={0} y2={height} />)
            }
        </g>
    );
};
GridVLines.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
};
export default pure(GridVLines);
