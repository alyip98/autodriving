import { CliState, State } from './state.js';
import { Cli } from '../cli.js';
import { Messages } from '../messages.js';
import { InitState } from './initState.js';

export class SimulationState extends State {
    onEnter(cli: Cli, fromState?: CliState) {
        // Your current list of cars are:
        //     - A, (1,2) N, FFRFFFFRRL
        //
        // After simulation, the result is:
        //     - A, (5,4) S
        //
        // Please choose from the following options:
        //     [1] Start over
        //     [2] Exit
        cli.printAllCars();
        cli.field.simulate();
        cli.print(
            Messages.SIMULATION_RESULT({ simulationResult: cli.formatCars() }),
        );
        cli.print(Messages.POST_SIMULATION_MENU);
    }

    lineHandler(cli: Cli, line: string): State | undefined {
        switch (parseInt(line)) {
            case 1:
                return new InitState();
            case 2:
                cli.print(Messages.GOODBYE);
                cli.exit();
        }
    }
}
