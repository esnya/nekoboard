import { range } from 'lodash';
import React, { PropTypes } from 'react';
import pure from '../enhancers/pure';

const GridHLines = props => {
    const {
        width,
        height,
        step,
    } = props;

    return (
        <g>
            {
                range(0, height, step)
                    .map((y, i) => <line key={i} x1={0} x2={width} y1={y} y2={y} />)
            }
        </g>
    );
};
GridHLines.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
};
export default pure(GridHLines);
