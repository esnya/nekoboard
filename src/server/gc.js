import config from 'config';
import _, { concat, union } from 'lodash';
import { getLogger } from 'log4js';
import { createClient } from './redis';

const Expires = config.get('gc.expires') * 1000;
const logger = getLogger('[GC]');
const redis = createClient();

export const runGC = () => {
    logger.info('Started');

    const now = Date.now();

    redis
        .keysAsync('nekoboard:*')
        .then((keys) =>
            _(keys)
                .map((key) => key.match(/^nekoboard:(.*?):/))
                .filter((m) => m)
                .map((m) => m[1])
                .union()
                .value()
        )
        .then((ids) => {
            logger.info(`Found: ${ids.length} boards.`);
            return ids;
        })
        .then((ids) => Promise.all(ids.map((id) =>
                redis.getAsync(`nekoboard:${id}:timestamp`)
                    .then((timestamp) => parseInt(timestamp, 10))
                    .then((timestamp) => ({id, timestamp}))
        )))
        .then((list) =>
            list.filter(({timestamp}) => !(timestamp + Expires > now))
                .map(({id}) => id)
        )
        .then((ids) => {
            logger.info(`Delete: ${ids.length} boards.`);
            return ids;
        })
        .then((ids) => Promise.all(
            ids.map((id) => redis.keysAsync(`nekoboard:${id}*`))
        ))
        .then((a) => concat(...a))
        .then((keys) => Promise.all(keys.map((key) => redis.delAsync(key))))
        .then(() => logger.info('Done'))
        .catch((e) => logger.error(e));
};

setInterval(runGC, config.get('gc.interval') * 1000);