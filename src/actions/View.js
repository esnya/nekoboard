import * as VIEW from '../constants/actions/View';

/**
 * Zoom in action creator.
 * @returns{object} Action
 */
export function zoomIn() {
    return {
        type: VIEW.ZOOM_IN,
    };
}

/**
 * Zoom out action creator.
 * @returns{object} Action
 */
export function zoomOut() {
    return {
        type: VIEW.ZOOM_OUT,
    };
}

/**
 * Reset zoom action creator.
 * @returns{object} Action
 */
export function resetZoom() {
    return {
        type: VIEW.ZOOM_RESET,
    };
}

/**
 * Perspective action creator.
 * @param{boolean} perspective - Perspective
 * @returns{object} Action
 */
export function perspective(p) {
    return {
        type: VIEW.PERSPECTIVE,
        perspective: p,
    };
}
