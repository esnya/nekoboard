import Config from 'config';
import EventEmitter from 'events';
import { pick } from 'lodash';
import { createClient } from './redis';
import * as Board from '../actions/Board';
import * as Shape from '../actions/Shape';
import { generate as genId } from '../utility/id';

const DefaultBoard = Config.get('board');
const BoardKeys = ['id', ...Object.keys(DefaultBoard)];

const ShapeKeys = [
    'id',
    'shape',
    'fill', 'stroke', 'strokeSize',
    'fontSize',
    'x', 'cx', 'x1', 'x2',
    'y', 'cy', 'y1', 'y2',
    'width', 'height',
    'r', 'rx', 'ry',
    'text',
    'points',
];

export class Client extends EventEmitter {
    constructor(boardId) {
        super();

        this.id = genId();

        this.boardId = boardId;
        const boardKey = this.boardKey = `nekoboard:${boardId}`;
        const shapeListKey = this.shapeListKey = `nekoboard:${boardId}:shapes`;

        const subscriber = this.subscriber = createClient();
        const redis = this.redis = createClient();

        this.touch();

        subscriber.subscribe(boardKey);
        subscriber.on('message', (channel, message) => {
            if (channel !== boardKey) return;

            const {
                action,
                sender,
            } = JSON.parse(message);
            if (sender === this.id) return;

            this.emit('action', action);
        });

        redis.getAsync(boardKey)
            .then((board) => board && JSON.parse(board) || {
                ...DefaultBoard,
                id: boardId,
            })
            .then((board) => this.emit('action', Board.update(board)));
        redis.lrangeAsync(shapeListKey, 0, -1)
            .then((shapes) => shapes && Promise.all(
                shapes.map((shapeKey) => redis.getAsync(shapeKey))
            ))
            .then((shapes) => this.emit('action', Shape.list(
                shapes.map((shape) => JSON.parse(shape))
            )));
    }

    end() {
        this.redis.end();
        this.subscriber.end();
        this.removeAllListeners();
    }

    touch() {
        this.redis.set(`nekoboard:${this.boardId}:timestamp`, Date.now());
    }

    publish(action) {
        this.touch();

        this.redis.publish(this.boardKey, JSON.stringify({
            action,
            sender: this.id,
        }));
    }

    setBoard(board) {
        const picked = pick(board, BoardKeys);

        this.redis.getAsync(this.boardKey)
            .then((prev) => ({
                ...(prev && JSON.parse(prev)),
                ...picked,
                id: this.boardId,
            }));

        this.publish(Board.update(picked));
    }

    shapeKeyOf(shapeId) {
        return `nekoboard:${this.boardId}:shape:${shapeId}`;
    }

    addShape(shape) {
        const picked = pick(shape, ShapeKeys);
        const shapeKey = this.shapeKeyOf(picked.id);

        this.redis.set(shapeKey, JSON.stringify(picked));
        this.redis.lpush(this.shapeListKey, shapeKey);

        this.publish(Shape.add(picked));
    }

    updateShape(shape) {
        const picked = pick(shape, ShapeKeys);
        const shapeKey = this.shapeKeyOf(picked.id);

        this.redis.getAsync(shapeKey)
            .then((prev) => this.redis.set(shapeKey, JSON.stringify({
                ...(prev && JSON.parse(prev)),
                ...picked,
            })));

        this.publish(Shape.update(picked));
    }

    removeShape(shapeId) {
        const shapeKey = this.shapeKeyOf(shapeId);

        this.redis.lrem(this.shapeListKey, 0, shapeKey);

        this.publish(Shape.remove(shapeId));
    }
}