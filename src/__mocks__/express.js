export const mock = {
    get: jest.genMockFn(),
    use: jest.genMockFn(),
    set: jest.genMockFn(),
};

export default Object.assign(
    jest.genMockFn().mockReturnValue(mock),
    {
        static: jest.genMockFn(),
    }
);