export const Messages = {
    WELCOME: `Welcome to Auto Driving Car Simulation!\n`,
    FIELD_INIT_PROMPT: `Please enter the width and height of the simulation field in x y format:\n`,
    FIELD_CREATION_SUCCESS: (args: { width: number; height: number }) =>
        `You have created a field of ${args.width} x ${args.height}.\n`,
    FIELD_CREATION_FAIL: (args: { error: string }) =>
        `Invalid dimensions for the simulation field, ${args.error}`,
    MAIN_MENU: `Please choose from the following options:
[1] Add a car to field
[2] Run simulation
`,
    POST_SIMULATION_MENU: `Please choose from the following options:
[1] Start over
[2] Exit
`,
    CAR_NAME_PROMPT: `Please enter the name of the car:\n`,
    CAR_NAME_FAIL: (args: { error: string }) =>
        `Invalid car name, ${args.error}`,
    CAR_POSITION_PROMPT: (args: { carName: string }) =>
        `Please enter initial position of car ${args.carName} in x y Direction format:\n`,
    CAR_POSITION_FAIL: (args: { error: string }) =>
        `Invalid position or direction, ${args.error}`,
    CAR_COMMANDS_PROMPT: (args: { carName: string }) =>
        `Please enter the commands for car ${args.carName}:\n`,
    LIST_CARS: (args: {
        formattedCars: string;
    }) => `Your current list of cars are:
${args.formattedCars}
`,
    SIMULATION_RESULT: (args: {
        simulationResult: string;
    }) => `After simulation, the result is:
${args.simulationResult}
`,
    GOODBYE: `Thank you for running the simulation. Goodbye!`,
};
