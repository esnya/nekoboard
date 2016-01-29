import { bindActionCreators } from 'redux';

export const mapStateToProps = (...keys) => (state) =>
    keys.reduce((result, key) => {
        result[key] = state[key];
        return result;
    }, {});
export const mapActionCreatorsToProps = (actions) =>
    (dispatch) => bindActionCreators(actions, dispatch);