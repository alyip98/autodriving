import { CliState, State } from './state.js';
import { Cli } from '../cli.js';
import { Messages } from '../messages.js';
import { CarNameState } from './carNameState.js';
import { SimulationState } from './simulationState.js';

export class MenuState extends State {
    static cliState = CliState.MENU;

    onEnter(cli: Cli, fromState: CliState) {
        cli.print(Messages.MAIN_MENU);
    }

    lineHandler(cli: Cli, line: string) {
        const option = parseInt(line.trim());
        switch (option) {
            case 1:
                return new CarNameState();
            case 2:
                return new SimulationState();
            default:
                break;
        }
        return undefined;
    }
}
