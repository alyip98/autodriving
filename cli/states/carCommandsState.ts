import { CliState, State } from './state.js';
import { Cli } from '../cli.js';
import { Messages } from '../messages.js';
import { MenuState } from './menuState.js';
import { Command } from '../../simulation/command.js';

export class CarCommandsState extends State {
    static cliState = CliState.ADD_CAR_COMMANDS;

    onEnter(cli: Cli, fromState: CliState) {
        cli.print(
            Messages.CAR_COMMANDS_PROMPT({ carName: cli.activeCar.name }),
        );
    }

    lineHandler(cli: Cli, line: string) {
        const commands = line.trim().split('');
        let isValid = true;
        if (!isValid) {
            // todo
        }
        cli.activeCar.commands = commands.map(this.parseCommand);
        cli.field.addCar(cli.activeCar);
        return new MenuState();
    }

    parseCommand(command: string): Command {
        switch (command.toLowerCase()) {
            case 'f':
                return Command.F;
            case 'l':
                return Command.L;
            case 'r':
            default:
                return Command.R;
        }
    }

    onExit(cli: Cli, toState?: CliState) {
        cli.printAllCars();
    }
}
