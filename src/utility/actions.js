import _ from 'lodash';

export const toEventHandlers = actions =>
    _(actions)
        .mapKeys((value, key) => `on${_.upperFirst(key)}`)
        .value();
