jest.dontMock('../Board');

import * as Board from '../Board';

describe('test', () => {
    it('should test', () => {
        Board.create('id');
        expect('test').toEqual('test');
    });
});