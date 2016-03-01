describe('StateStorage', () => {
    jest.autoMockOff();

    const {
        StateStorage,
    } = require('../state-storage');

    const DOMStorage = require('dom-storage');
    const localStorage =
        window.localStorage =
            new DOMStorage(null, { strict: true });

    let storage;
    it('is class', () => {
        storage = new StateStorage('test-key', {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
        }, ['key1', 'key3']);
    });

    it('loads default state', () => {
        expect(storage.load()).toEqual({
            key1: 'value1',
            key2: 'value2',
            key3: 'value3',
        });
    });

    it('saves state', () => {
        expect(storage.save({
            key1: 'value4',
            key2: 'value5',
            key3: 'value6',
        })).toEqual({
            key1: 'value4',
            key2: 'value5',
            key3: 'value6',
        });

        expect(JSON.parse(localStorage.getItem('test-key'))).toEqual({
            key1: 'value4',
            key3: 'value6',
        });
    });

    it('loads saved state', () => {
        expect(storage.load()).toEqual({
            key1: 'value4',
            key2: 'value2',
            key3: 'value6',
        });
    });

    it('wraps reducer', () => {
        const reducer = storage.apply((state, action) => {
            switch (action.type) {
                case 'SET':
                    return {
                        ...state,
                        [action.key]: action.value,
                    };
            }
            return state;
        });

        let state = reducer(undefined, { type: 'INIT' });
        expect(state).toEqual({
            key1: 'value4',
            key2: 'value2',
            key3: 'value6',
        });

        state = reducer(state, { type: 'SET', key: 'key2', value: 'value7' });
        expect(state).toEqual({
            key1: 'value4',
            key2: 'value7',
            key3: 'value6',
        });
        expect(storage.load()).toEqual({
            key1: 'value4',
            key2: 'value2',
            key3: 'value6',
        });

        state = reducer(state, { type: 'SET', key: 'key1', value: 'value8' });
        expect(state).toEqual({
            key1: 'value8',
            key2: 'value7',
            key3: 'value6',
        });
        expect(storage.load()).toEqual({
            key1: 'value8',
            key2: 'value2',
            key3: 'value6',
        });
    });
});
