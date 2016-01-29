import { createHash } from 'crypto';

const seed = Date.now() * Math.random();
let serial = 1;

export const generate = (len, data = `${seed}:${serial++}`) =>
    createHash('sha1').update(data).digest('hex').substr(0, len);