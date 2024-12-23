# Auto Driving Car Simulation

This CLI application allows users to simulate a rectangular field with any number of pre-programmed self-driving cars.

## Installation

### Prerequisites

- Have [NodeJS v20 or higher](https://nodejs.org/en) installed

```shell
npm install
```

## Running the Application

```shell
npm start
```

## Running Tests

```shell
npm test
```

## Assumptions/Notes

- Although not explicitly mentioned in the spec, I assumed that cars cannot start in the same grid space.
- The spec doesn't define behavior in the case of malformed user input,
  I've attempted to add some error handling, but in the interest of time, I assume that user inputs are valid and
  omitted testing the error handling and input validation portions, even though they should be thoroughly tested in
  production software.
- I've designed the application to be extensible, with the assumption that this application will be
  further developed to meet future requirements.
- Assuming that I am writing production grade software, I've also set up some dev tooling to ensure better code quality
  and formatting.
- Apart from dev tooling (such as code formatting, testing tools), I've also refrained from using external
  libraries other than the runtime's built ins for this assignment, but in a production environment some parts might be
  benefit from dropping in an open-source/3rd party library instead, such as a CLI framework that can provide better
  user and developer experience
- The solution contains some unit tests for core logic such as car movement and collision checking.
  Additionally, there are integration tests that test the entire application as a black box, i.e. mocking stdin/stdout
  and
  comparing the output against expected values.
- Assuming that the simulation will need to cater for a large number of cars, I've attempted to make the algorithm
  efficient by tracking the positions of cars in a map (JS object), so every car will not need to be checked against
  every other car for collision.

If any assumptions are made, please document and share those as part of the submission.
Similarly, if you identify any gaps or areas of improvements, please identify them as well.

# Areas for Improvement

- More comprehensive error handling
    - The app should be able to handle unexpected user inputs gracefully
- More comprehensive unit and integration tests
    - The CLI logic isn't tested comprehensively 
