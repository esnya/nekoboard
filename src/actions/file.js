import * as FILE from '../constants/actions/file';

export const save = () => ({
    type: FILE.SAVE,
});
export const load = () => ({
    type: FILE.LOAD,
});
export const exportSVG = () => ({
    type: FILE.EXPORT_SVG,
});
