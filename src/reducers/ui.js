import { handleActions } from 'redux-actions';
import * as Actions from '../actions/ui';
import UI from '../records/UI';

export default handleActions({
    [Actions.DRAWER]: (state, { payload }) => state.set('drawer', payload),
}, new UI());
