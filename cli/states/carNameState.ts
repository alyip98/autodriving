import { CliState, State } from './state.js';
import { Cli } from '../cli.js';
import { Messages } from '../messages.js';
import { Car } from '../../simulation/car.js';
import { CarPositionState } from './carPositionState.js';

export class CarNameState extends State {
    static cliState = CliState.ADD_CAR_NAME;

    onEnter(cli: Cli, fromState: CliState) {
        cli.print(Messages.CAR_NAME_PROMPT);
        // initialize a new car
        cli.activeCar = new Car();
    }

    lineHandler(cli: Cli, line: string) {
        const name = line.trim();
        if (name === '') {
            cli.print(
                Messages.CAR_NAME_FAIL({ error: 'name cannot be empty' }),
            );
        }
        cli.activeCar.name = name;
        return new CarPositionState();
    }
}
