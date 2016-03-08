export const mockServer = {
    listen: jest.genMockFn(),
};

export const Server = jest.genMockFn()
    .mockReturnValue(mockServer);
