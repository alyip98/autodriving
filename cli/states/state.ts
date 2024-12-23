import { Cli } from '../cli.js';

export enum CliState {
    UNDEFINED,
    INIT,
    MENU,
    ADD_CAR_NAME,
    ADD_CAR_POSITION,
    ADD_CAR_COMMANDS,
}

export abstract class State {
    cliState: CliState = CliState.UNDEFINED;

    onEnter(cli: Cli, fromState?: CliState): void {}

    onExit(cli: Cli, toState?: CliState): void {}

    lineHandler(cli: Cli, line: string): State | undefined {
        return;
    }
}
