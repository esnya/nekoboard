import { grey300 } from 'material-ui/styles/colors';
import React from 'react';
import pure from '../enhancers/pure';
import GridHLines from './GridHLines';
import GridVLines from './GridVLines';
import GridLabels from './GridLabels';

const Grid = props => (
    <g stroke={grey300}>
        <GridHLines {...props} />
        <GridVLines {...props} />
        <GridLabels {...props} />
    </g>
);
export default pure(Grid);
