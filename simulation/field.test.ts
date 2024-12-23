import { expect, it } from 'vitest';
import { Field } from './field.js';
import { Car } from './car.js';
import { Direction } from './direction.js';
import { Command } from './command.js';

const { F, L, R } = Command;

it('should add cars', () => {
    const field = new Field();
    const car1 = new Car();
    car1.name = 'A';
    const car2 = new Car();
    car2.name = 'B';
    field.addCar(car1);
    field.addCar(car2);
    expect(field.cars).eql([car1, car2]);
});

it('should simulate a single car', () => {
    const field = new Field();
    field.width = 5;
    field.height = 5;
    const car = new Car();
    car.name = 'A';
    car.x = 0;
    car.y = 0;
    car.facing = Direction.N;
    car.commands = [F, F, R, F, L, F, F, F, L, F, F];
    field.addCar(car);
    field.simulate();
    expect(car.x).eq(0);
    expect(car.y).eq(4);
    expect(car.facing).eq(Direction.W);
});

it('should simulate multiple cars', () => {
    const field = new Field();
    field.width = 5;
    field.height = 5;
    const car1 = new Car();
    car1.name = 'A';
    car1.x = 0;
    car1.y = 0;
    car1.facing = Direction.N;
    car1.commands = [F, F, R, F, L, F, F, F, L, F, F];

    const car2 = new Car();
    car2.name = 'B';
    car2.x = 3;
    car2.y = 2;
    car2.facing = Direction.E;
    car2.commands = [F, R, R, F];
    field.addCar(car1);
    field.addCar(car2);
    field.simulate();

    expect(car1.x).eq(0);
    expect(car1.y).eq(4);
    expect(car1.facing).eq(Direction.W);

    expect(car2.x).eq(3);
    expect(car2.y).eq(2);
    expect(car2.facing).eq(Direction.W);

    expect(field.carPositions).to.deep.include({
        '(0,4)': [car1],
        '(3,2)': [car2],
    });
});
it('should simulate collisions', () => {
    const field = new Field();
    field.width = 5;
    field.height = 5;

    const car1 = new Car();
    car1.name = 'A';
    car1.x = 0;
    car1.y = 0;
    car1.facing = Direction.N;
    car1.commands = [F, F];

    const car2 = new Car();
    car2.name = 'B';
    car2.x = 0;
    car2.y = 4;
    car2.facing = Direction.S;
    car2.commands = [F, F];
    field.addCar(car1);
    field.addCar(car2);
    field.simulate();

    expect(car1.hasCollided).to.be.true;
    expect(car1.x).eq(0);
    expect(car1.y).eq(2);
    expect(car1.collisionInfo).eql({
        x: 0,
        y: 2,
        targetName: 'B',
        stepNumber: 2,
    });

    expect(car2.hasCollided).to.be.true;
    expect(car2.x).eq(0);
    expect(car2.y).eq(2);
    expect(car2.collisionInfo).eql({
        x: 0,
        y: 2,
        targetName: 'A',
        stepNumber: 2,
    });

    expect(field.carPositions).to.deep.include({
        '(0,2)': [car1, car2],
    });
});

it('should simulate collisions', () => {
    const field = new Field();
    field.width = 5;
    field.height = 5;

    const car1 = new Car();
    car1.name = 'A';
    car1.x = 0;
    car1.y = 0;
    car1.facing = Direction.N;
    car1.commands = [F, F];

    const car2 = new Car();
    car2.name = 'B';
    car2.x = 0;
    car2.y = 4;
    car2.facing = Direction.S;
    car2.commands = [F, F];
    field.addCar(car1);
    field.addCar(car2);
    field.simulate();

    expect(car1.hasCollided).to.be.true;
    expect(car1.x).eq(0);
    expect(car1.y).eq(2);
    expect(car1.collisionInfo).eql({
        x: 0,
        y: 2,
        targetName: 'B',
        stepNumber: 2,
    });

    expect(car2.hasCollided).to.be.true;
    expect(car2.x).eq(0);
    expect(car2.y).eq(2);
    expect(car2.collisionInfo).eql({
        x: 0,
        y: 2,
        targetName: 'A',
        stepNumber: 2,
    });

    expect(field.carPositions).to.deep.include({
        '(0,2)': [car1, car2],
    });
});
