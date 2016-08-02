export const Server = jest.genMockFn();
Server.prototype = {
    listen: jest.genMockFn(),
};
