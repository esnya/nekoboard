import * as FILE from '../constants/actions/file.js';

export const save = () => ({
    type: FILE.SAVE,
});
export const load = () => ({
    type: FILE.LOAD,
});
export const exportSVG = () => ({
    type: FILE.EXPORT_SVG,
});
