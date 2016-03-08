import { pick } from 'lodash';

export class StateStorage {
    constructor(key, initialState = {}, stateKeys = null) {
        this.key = key;
        this.initialState = initialState;
        this.stateKeys = stateKeys;
    }

    pick(state) {
        return this.stateKeys === null
            ? state
            : pick(state, this.stateKeys);
    }

    get storage() {
        return window.localStorage || {
            getItem: () => '{}',
            setItem: () => {},
        };
    }

    load() {
        const data = this.storage.getItem(this.key);

        return {
            ...this.initialState,
            ...(data && this.pick(JSON.parse(data))),
        };
    }

    save(state) {
        this.storage.setItem(this.key, JSON.stringify(this.pick(state)));

        return state;
    }

    apply(reducer) {
        const initialState = this.load();

        return (state = initialState, action) => {
            const nextState = reducer(state, action);

            return nextState === state ? nextState : this.save(nextState);
        };
    }
}
