import { Car } from './car.js';
import { Direction, TurnDirection } from './direction.js';
import { describe, expect, it, test } from 'vitest';
import { Command } from './command.js';

it('should turn left', () => {
    const car = new Car();
    car.facing = Direction.N;
    expect(car.facing).eq(Direction.N);
    car.turn(TurnDirection.LEFT);
    expect(car.facing).eq(Direction.W);
    car.turn(TurnDirection.LEFT);
    expect(car.facing).eq(Direction.S);
    car.turn(TurnDirection.LEFT);
    expect(car.facing).eq(Direction.E);
    car.turn(TurnDirection.LEFT);
    expect(car.facing).eq(Direction.N);
});

it('should turn right', () => {
    const car = new Car();
    car.facing = Direction.N;
    expect(car.facing).eq(Direction.N);
    car.turn(TurnDirection.RIGHT);
    expect(car.facing).eq(Direction.E);
    car.turn(TurnDirection.RIGHT);
    expect(car.facing).eq(Direction.S);
    car.turn(TurnDirection.RIGHT);
    expect(car.facing).eq(Direction.W);
    car.turn(TurnDirection.RIGHT);
    expect(car.facing).eq(Direction.N);
});

it('should move forward', () => {
    const car = new Car();
    car.x = 1;
    car.y = 3;
    car.facing = Direction.N;
    car.forward(5, 5);
    expect(car.x).eq(1);
    expect(car.y).eq(4);
});

describe('should not move forward if at edge of field', () => {
    test('facing North', () => {
        const car = new Car();
        car.x = 1;
        car.y = 4;
        car.facing = Direction.N;
        car.forward(5, 5);
        expect(car.x).eq(1);
        expect(car.y).eq(4);
    });
    test('facing South', () => {
        const car = new Car();
        car.x = 1;
        car.y = 0;
        car.facing = Direction.S;
        car.forward(5, 5);
        expect(car.x).eq(1);
        expect(car.y).eq(0);
    });
    test('facing East', () => {
        const car = new Car();
        car.x = 4;
        car.y = 4;
        car.facing = Direction.E;
        car.forward(5, 5);
        expect(car.x).eq(4);
        expect(car.y).eq(4);
    });
    test('facing West', () => {
        const car = new Car();
        car.x = 0;
        car.y = 4;
        car.facing = Direction.W;
        car.forward(5, 5);
        expect(car.x).eq(0);
        expect(car.y).eq(4);
    });
});

it('should follow commands', () => {
    const car = new Car();
    car.x = 0;
    car.y = 0;
    car.facing = Direction.N;
    const { F, L, R } = Command;
    car.commands = [F, F, R, F, F];
    car.step(0, 5, 5);
    expect(car.x).eq(0);
    expect(car.y).eq(1);
    car.step(1, 5, 5);
    expect(car.x).eq(0);
    expect(car.y).eq(2);
    car.step(2, 5, 5);
    expect(car.x).eq(0);
    expect(car.y).eq(2);
    car.step(3, 5, 5);
    expect(car.x).eq(1);
    expect(car.y).eq(2);
    car.step(4, 5, 5);
    expect(car.x).eq(2);
    expect(car.y).eq(2);
});
