import { CliState, State } from './state.js';
import { Cli } from '../cli.js';
import { Messages } from '../messages.js';
import { CarCommandsState } from './carCommandsState.js';

import { Direction } from '../../simulation/direction.js';

export class CarPositionState extends State {
    static cliState = CliState.ADD_CAR_POSITION;

    onEnter(cli: Cli, fromState: CliState) {
        cli.print(
            Messages.CAR_POSITION_PROMPT({ carName: cli.activeCar.name }),
        );
    }

    lineHandler(cli: Cli, line: string) {
        const tokens = line.trim().split(' ');
        const x = parseInt(tokens[0]);
        const y = parseInt(tokens[1]);
        const dir: Direction = this.parseDirection(tokens[2]);

        cli.activeCar.x = x;
        cli.activeCar.y = y;
        cli.activeCar.facing = dir;
        return new CarCommandsState();
    }

    parseDirection(dir: string): Direction {
        switch (dir.toUpperCase()) {
            case 'N':
                return Direction.N;
            case 'E':
                return Direction.E;
            case 'S':
                return Direction.S;
            case 'W':
            default:
                return Direction.W;
        }
    }
}
