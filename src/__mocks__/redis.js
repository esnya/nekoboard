export const mockClient = {
    on: jest.genMockFn(),
};

export class RedisClient {}
export class Multi {}

export const createClient = jest.genMockFn()
    .mockReturnValue(mockClient);
