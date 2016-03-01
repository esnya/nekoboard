import { createHash } from 'crypto';

const seed = Date.now() * Math.random();
let serial = 1;

/**
 * Generate unique ID
 * @param{number} len - Length of ID
 * @param{data} data - Unique value to generate ID
 * @returns{string} Unique ID
 */
export function generate(len, data = `${seed}:${serial++}`) {
    return createHash('sha1')
        .update(data)
        .digest('hex')
        .substr(0, len);
}
