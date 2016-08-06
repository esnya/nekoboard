export const ZOOM_IN = 'VIEW/ZOOM_IN';
/**
 * Zoom in action creator.
 * @returns{object} Action
 */
export function zoomIn() {
    return {
        type: ZOOM_IN,
    };
}

export const ZOOM_OUT = 'VIEW/ZOOM_OUT';
/**
 * Zoom out action creator.
 * @returns{object} Action
 */
export function zoomOut() {
    return {
        type: ZOOM_OUT,
    };
}

export const RESET_ZOOM = 'VIEW/RESET_ZOOM';
/**
 * Reset zoom action creator.
 * @returns{object} Action
 */
export function resetZoom() {
    return {
        type: RESET_ZOOM,
    };
}

export const PERSPECTIVE = 'VIEW/PERSPECTIVE';
/**
 * Perspective action creator.
 * @param{boolean} perspective - Perspective
 * @returns{object} Action
 */
export function perspective(p) {
    return {
        type: PERSPECTIVE,
        perspective: p,
    };
}
