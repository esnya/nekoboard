import { join } from 'path';
import { readdirSync } from 'fs';

describe('Actions', () => {
    readdirSync(join(__dirname, '../'))
        .map((file) => file.match(/^(.*)\.js$/))
        .filter((m) => m)
        .map((m) => `../${m[1]}`)
        .forEach((path) => {
            jest.dontMock(path);
            const actions = require(path);

            describe(path, () => {
                it('should be camelCase', () => {
                    Object
                        .keys(actions)
                        .filter((key) => typeof(actions[key]) === 'function')
                        .forEach((key) => {
                            expect(key.match(/^[a-z][A-Z]+$/)).not.toBe(false);
                        });
                });

                it('should return action', () => {
                    Object
                        .keys(actions)
                        .filter((key) => typeof(actions[key]) === 'function')
                        .map((key) => actions[key]({}, {}, {}))
                        .forEach((action) => {
                            expect(action.type).toBeDefined();
                            expect(action.type).not.toBeNull();
                            expect(typeof(action.type)).toEqual('string');
                        });
                });
            });
        });
});