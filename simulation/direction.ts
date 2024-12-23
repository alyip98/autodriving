export enum Direction {
    N = 'N',
    E = 'E',
    S = 'S',
    W = 'W',
}

const directions = [Direction.N, Direction.E, Direction.S, Direction.W];

export enum TurnDirection {
    RIGHT = 1,
    LEFT = -1,
}

export function turnRight(d: Direction): Direction {
    return directions[(directions.indexOf(d) + 1) % directions.length];
}

export function turnLeft(d: Direction): Direction {
    return directions[
        (directions.indexOf(d) + directions.length - 1) % directions.length
    ];
}
