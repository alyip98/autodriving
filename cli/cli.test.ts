import { expect, test, vi } from 'vitest';
import { Cli } from './cli.js';
import readline from 'node:readline';
import { Readable, Writable } from 'node:stream';

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

test('normal cli usage', async () => {
    const cli = new Cli();
    const inputStream = new Readable();
    inputStream._read = () => {};
    const outputStream = new Writable();
    cli.rl = readline.createInterface({
        input: inputStream,
        output: outputStream,
    });
    let output = '';
    const printSpy = vi.spyOn(cli, 'print');
    printSpy.mockImplementation((args) => {
        output += args || '';
    });
    const exitSpy = vi.spyOn(cli, 'exit');
    // noinspection TypeScriptValidateTypes
    exitSpy.mockImplementationOnce(() => {});
    cli.start();

    inputStream.push('10 10\n');
    inputStream.push('1\n');
    inputStream.push('A\n');
    inputStream.push('0 0 N\n');
    inputStream.push('FFF\n');
    inputStream.push('2\n');
    inputStream.push('2\n');

    await sleep(1);

    expect(output).eq(`Welcome to Auto Driving Car Simulation!
Please enter the width and height of the simulation field in x y format:
You have created a field of 10 x 10.
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Please enter the name of the car:
Please enter initial position of car A in x y Direction format:
Please enter the commands for car A:
Your current list of cars are:
- A, (0,0) N, FFF
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Your current list of cars are:
- A, (0,0) N, FFF
After simulation, the result is:
- A, (0,3) N, FFF
Please choose from the following options:
[1] Start over
[2] Exit
Thank you for running the simulation. Goodbye!`);
});

test('normal cli usage after restart', async () => {
    const cli = new Cli();
    const inputStream = new Readable();
    inputStream._read = () => {};
    const outputStream = new Writable();
    cli.rl = readline.createInterface({
        input: inputStream,
        output: outputStream,
    });
    let output = '';
    const printSpy = vi.spyOn(cli, 'print');
    printSpy.mockImplementation((args) => {
        output += args || '';
    });
    const exitSpy = vi.spyOn(cli, 'exit');
    // noinspection TypeScriptValidateTypes
    exitSpy.mockImplementationOnce(() => {});
    cli.start();

    inputStream.push('10 10\n');
    inputStream.push('1\n');
    inputStream.push('A\n');
    inputStream.push('0 0 N\n');
    inputStream.push('FFF\n');
    inputStream.push('2\n');
    inputStream.push('1\n');
    inputStream.push('10 10\n');
    inputStream.push('1\n');
    inputStream.push('A\n');
    inputStream.push('0 0 N\n');
    inputStream.push('FFF\n');
    inputStream.push('2\n');
    inputStream.push('2\n');

    await sleep(1);

    expect(output).eq(`Welcome to Auto Driving Car Simulation!
Please enter the width and height of the simulation field in x y format:
You have created a field of 10 x 10.
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Please enter the name of the car:
Please enter initial position of car A in x y Direction format:
Please enter the commands for car A:
Your current list of cars are:
- A, (0,0) N, FFF
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Your current list of cars are:
- A, (0,0) N, FFF
After simulation, the result is:
- A, (0,3) N, FFF
Please choose from the following options:
[1] Start over
[2] Exit
Welcome to Auto Driving Car Simulation!
Please enter the width and height of the simulation field in x y format:
You have created a field of 10 x 10.
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Please enter the name of the car:
Please enter initial position of car A in x y Direction format:
Please enter the commands for car A:
Your current list of cars are:
- A, (0,0) N, FFF
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Your current list of cars are:
- A, (0,0) N, FFF
After simulation, the result is:
- A, (0,3) N, FFF
Please choose from the following options:
[1] Start over
[2] Exit
Thank you for running the simulation. Goodbye!`);
});

test('normal cli usage with collision', async () => {
    const cli = new Cli();
    const inputStream = new Readable();
    inputStream._read = () => {};
    const outputStream = new Writable();
    cli.rl = readline.createInterface({
        input: inputStream,
        output: outputStream,
    });
    let output = '';
    const printSpy = vi.spyOn(cli, 'print');
    printSpy.mockImplementation((args) => {
        output += args || '';
    });
    const exitSpy = vi.spyOn(cli, 'exit');
    // noinspection TypeScriptValidateTypes
    exitSpy.mockImplementationOnce(() => {});
    cli.start();

    inputStream.push('5 5\n');
    inputStream.push('1\n');
    inputStream.push('A\n');
    inputStream.push('0 0 N\n');
    inputStream.push('FFF\n');
    inputStream.push('1\n');
    inputStream.push('B\n');
    inputStream.push('0 4 S\n');
    inputStream.push('FFF\n');
    inputStream.push('2\n');
    inputStream.push('2\n');

    await sleep(1);

    expect(output).eq(`Welcome to Auto Driving Car Simulation!
Please enter the width and height of the simulation field in x y format:
You have created a field of 5 x 5.
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Please enter the name of the car:
Please enter initial position of car A in x y Direction format:
Please enter the commands for car A:
Your current list of cars are:
- A, (0,0) N, FFF
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Please enter the name of the car:
Please enter initial position of car B in x y Direction format:
Please enter the commands for car B:
Your current list of cars are:
- A, (0,0) N, FFF
- B, (0,4) S, FFF
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Your current list of cars are:
- A, (0,0) N, FFF
- B, (0,4) S, FFF
After simulation, the result is:
- A, collides with B at (0,2) at step 2
- B, collides with A at (0,2) at step 2
Please choose from the following options:
[1] Start over
[2] Exit
Thank you for running the simulation. Goodbye!`);
});

test('spec test case', async () => {
    const cli = new Cli();
    const inputStream = new Readable();
    inputStream._read = () => {};
    const outputStream = new Writable();
    cli.rl = readline.createInterface({
        input: inputStream,
        output: outputStream,
    });
    let output = '';
    const printSpy = vi.spyOn(cli, 'print');
    printSpy.mockImplementation((args) => {
        output += args || '';
    });
    const exitSpy = vi.spyOn(cli, 'exit');
    // noinspection TypeScriptValidateTypes
    exitSpy.mockImplementationOnce(() => {});
    cli.start();

    inputStream.push('10 10\n');
    inputStream.push('1\n');
    inputStream.push('A\n');
    inputStream.push('1 2 N\n');
    inputStream.push('FFRFFFFRRL\n');
    inputStream.push('1\n');
    inputStream.push('B\n');
    inputStream.push('7 8 W\n');
    inputStream.push('FFLFFFFFFF\n');
    inputStream.push('2\n');

    await sleep(1);

    expect(output).eq(`Welcome to Auto Driving Car Simulation!
Please enter the width and height of the simulation field in x y format:
You have created a field of 10 x 10.
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Please enter the name of the car:
Please enter initial position of car A in x y Direction format:
Please enter the commands for car A:
Your current list of cars are:
- A, (1,2) N, FFRFFFFRRL
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Please enter the name of the car:
Please enter initial position of car B in x y Direction format:
Please enter the commands for car B:
Your current list of cars are:
- A, (1,2) N, FFRFFFFRRL
- B, (7,8) W, FFLFFFFFFF
Please choose from the following options:
[1] Add a car to field
[2] Run simulation
Your current list of cars are:
- A, (1,2) N, FFRFFFFRRL
- B, (7,8) W, FFLFFFFFFF
After simulation, the result is:
- A, collides with B at (5,4) at step 7
- B, collides with A at (5,4) at step 7
Please choose from the following options:
[1] Start over
[2] Exit
`);
});
