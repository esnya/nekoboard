export const mockSocket = {
    on: jest.genMockFn(),
};
export default jest.genMockFn().mockReturnValue(mockSocket);
