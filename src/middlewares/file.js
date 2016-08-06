import { pick } from 'lodash';
import { update } from '../actions/board';
import { add } from '../actions/shape';
import * as FILE from '../actions/file';
import { BOARD_KEYS, SHAPE_KEYS } from '../constants/keys';

const getData = ({ board, shapes }) => ({
    board,
    shapes,
});
const saveAsFile = (data, name, type) => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', name);
    a.dispatchEvent(new MouseEvent('click'));
};

const load = () => new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'application/json');
    input.dispatchEvent(new MouseEvent('click'));
    input.addEventListener('change', () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onloadend = ({ target }) => {
            if (target.error) return reject(target.error);

            return resolve(JSON.parse(target.result));
        };
        reader.readAsText(file);
    });
});
const save = (data) => {
    saveAsFile(
        JSON.stringify(data),
        `${data.board.title}.json`,
        'application/json'
    );
};
const saveSVG = ({ board }) => {
    const svg = document.getElementById('canvas-svg');
    const data =
        `<?xml version="1.0" encoding="UTF-8" ?><svg xmlns="http://www.w3.org/2000/svg">${svg.innerHTML}</svg>`;
    saveAsFile(data, `${board.title}.svg`, 'image/svg+xml');
};

export const file = ({ dispatch, getState }) => (next) => (action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
    case FILE.LOAD:
        load().then((data) => {
            if (typeof data.board === 'object') {
                dispatch(update(pick(
                        data.board,
                        BOARD_KEYS.filter((key) => key !== 'id')
                    )));
            }
            if (Array.isArray(data.shapes)) {
                data.shapes
                    .map((shape) => pick(
                            shape,
                            SHAPE_KEYS.filter((key) => key !== 'id')
                        ))
                    .map((shape) => add(shape))
                    .forEach((a) => dispatch(a));
            }
        });
        break;
    case FILE.SAVE:
        save(getData(getState()));
        break;
    case FILE.EXPORT_SVG:
        saveSVG(getData(getState()));
        break;
    }

    return next(action);
};
