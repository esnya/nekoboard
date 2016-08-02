import { readdirSync } from 'fs';
import { join } from 'path';

describe('constants', () => {
    it('should be unique', () => {
        const counter = readdirSync(join(__dirname, '..'))
            .map((file) => file.match(/^(.*)\.js$/))
            .filter((m) => m)
            .map((m) => `../${m[0]}`)
            .reduce((c, path) => {
                jest.dontMock(path);
                const actions = require(path);

                Object.keys(actions)
                    .map((key) => actions[key])
                    .forEach((value) => {
                        // eslint-disable-next-line no-param-reassign
                        c[value] = (c[value] || 0) + 1;
                    });

                return c;
            }, {});

        Object.keys(counter)
            .forEach((key) => {
                expect(counter[key]).toBe(1);
            });
    });
});
