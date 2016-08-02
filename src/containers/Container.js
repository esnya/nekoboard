import { bindActionCreators } from 'redux';

export const mapStateToProps = (...keys) => (state) =>
    keys.reduce((result, key) => ({
        ...result,
        [key]: state[key],
    }), {});
export const mapActionCreatorsToProps = (actions) =>
    (dispatch) => bindActionCreators(actions, dispatch);
