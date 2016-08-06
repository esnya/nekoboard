import * as VIEW from '../actions/view';
import { StateStorage } from './state-storage';

const storage = new StateStorage(
    'nekoboard/view',
    {
        zoom: 1,
        perspective: false,
    },
    ['zoom', 'perspective']
);

export const view = storage.apply((state, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
    case VIEW.ZOOM_IN:
        return {
            ...state,
            zoom: state.zoom * 1.1,
        };
    case VIEW.ZOOM_OUT:
        return {
            ...state,
            zoom: state.zoom / 1.1,
        };
    case VIEW.RESET_ZOOM:
        return {
            ...state,
            zoom: 1,
        };
    case VIEW.PERSPECTIVE:
        return {
            ...state,
            perspective: action.perspective,
        };
    }

    return state;
});
