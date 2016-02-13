import Config from 'config';
import { promisifyAll } from 'bluebird';
import { getLogger } from 'log4js';
import Redis, { RedisClient, Multi } from 'redis';

const logger = getLogger('[redis-client]');

promisifyAll(RedisClient.prototype);
promisifyAll(Multi.prototype);

export const createClient = () => {
    const client = Redis.createClient(Config.get('redis'));
    client.on('error', (e) => logger.error(e));
    return client;
};