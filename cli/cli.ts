import readline from 'node:readline';
import { stdin as input, stdout as output } from 'process';
import { State } from './states/state.js';
import { Field } from '../simulation/field.js';
import { Car } from '../simulation/car.js';
import { Messages } from './messages.js';
import { InitState } from './states/initState.js'; // Controller class for CLI logic

// Controller class for CLI logic
export class Cli {
    // CLI is implemented as a state machine
    state: State = new InitState();
    rl = readline.createInterface({ input, output });
    field = new Field();
    activeCar: Car = new Car();

    print(msg = '') {
        console.log(msg);
    }

    start() {
        this.rl.on('line', (line) => this.lineHandler(line));
        this.state.onEnter(this);
    }

    lineHandler(line: any) {
        const nextState = this.state.lineHandler(this, line);
        if (nextState !== undefined) {
            this.changeState(nextState);
        }
    }

    changeState(state: State) {
        const prevState = this.state.cliState;
        this.state.onExit(this, state.cliState);
        this.state = state;
        this.state.onEnter(this, prevState);
    }

    formatCars(): string {
        return this.field.cars.map((car) => `- ${car.toString()}`).join('\n');
    }

    printAllCars() {
        this.print(
            Messages.LIST_CARS({
                formattedCars: this.formatCars(),
            }),
        );
    }

    exit() {
        process.exit();
    }
}

export function setupCli() {
    new Cli().start();
}
