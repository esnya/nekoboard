const IO = jest.genMockFn();
IO.prototype = {
    on: jest.genMockFn(),
};

export default IO;
