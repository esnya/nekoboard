/* eslint no-console: 0 */

export const getLogger = (name) => ({
    error: (...args) => console.error(name, ...args),
    info: (...args) => console.info(name, ...args),
    debug: (...args) => console.debug(name, ...args),
    log: (...args) => console.log(name, ...args),
});