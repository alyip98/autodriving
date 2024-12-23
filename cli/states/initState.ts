import { CliState, State } from './state.js';
import { Messages } from '../messages.js';
import { Cli } from '../cli.js';
import { MenuState } from './menuState.js';
import { Field } from '../../simulation/field.js';

export class InitState extends State {
    static cliState = CliState.INIT;
    width: number = 0;
    height: number = 0;

    override onEnter(cli: Cli, fromState: CliState) {
        cli.print(Messages.WELCOME);
        cli.print(Messages.FIELD_INIT_PROMPT);
        cli.field = new Field();
    }

    override lineHandler(cli: Cli, line: string) {
        const [width, height] = line.split(' ').map((i) => parseInt(i));
        if (isNaN(width) || isNaN(height)) {
            cli.print(
                Messages.FIELD_CREATION_FAIL({
                    error: 'width or height is not a number',
                }),
            );
            return undefined;
        }
        if (width <= 0 || height <= 0) {
            cli.print(
                Messages.FIELD_CREATION_FAIL({
                    error: 'width or height must be greater than 0',
                }),
            );
            return undefined;
        }

        this.width = width;
        this.height = height;
        return new MenuState();
    }

    override onExit(cli: Cli, toState: CliState) {
        cli.print(
            Messages.FIELD_CREATION_SUCCESS({
                width: this.width,
                height: this.height,
            }),
        );
        cli.field.width = this.width;
        cli.field.height = this.height;
    }
}
