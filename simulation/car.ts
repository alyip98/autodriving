import { CollisionInfo } from './collisionInfo.js';
import { Direction, TurnDirection, turnLeft, turnRight } from './direction.js';
import { Command } from './command.js';

const directionMap: Record<Direction, { dx: number; dy: number }> = {
    E: { dx: 1, dy: 0 },
    N: { dx: 0, dy: 1 },
    S: { dx: 0, dy: -1 },
    W: { dx: -1, dy: 0 },
};

export class Car {
    name: string = '';
    x: number = -1;
    y: number = -1;
    facing: Direction = Direction.N;
    isActive: boolean = true;
    commands: Command[] = [];
    // track the highest step number this car has executed
    stepNumber: number = -1;
    hasCollided: boolean = false;
    collisionInfo: CollisionInfo | undefined = undefined;

    toString(): string {
        if (this.hasCollided) {
            return `${this.name}, collides with ${this.collisionInfo?.targetName} at (${this.collisionInfo?.x},${this.collisionInfo?.y}) at step ${this.collisionInfo?.stepNumber}`;
        }
        return `${this.name}, (${this.x},${this.y}) ${this.facing}, ${this.commands.join('')}`;
    }

    step(stepNumber: number, width: number, height: number) {
        if (!this.isActive) return;
        if (stepNumber >= this.commands.length) {
            this.isActive = false;
            return;
        }
        this.stepNumber = stepNumber;
        this.executeCommand(this.commands[stepNumber], width, height);
    }

    private executeCommand(command: Command, width: number, height: number) {
        switch (command) {
            case Command.F:
                this.forward(width, height);
                break;
            case Command.L:
                this.turn(TurnDirection.LEFT);
                break;
            case Command.R:
                this.turn(TurnDirection.RIGHT);
                break;
        }
    }

    forward(width: number, height: number) {
        const { dx, dy } = directionMap[this.facing];
        this.x = Math.min(width - 1, Math.max(0, this.x + dx));
        this.y = Math.min(width - 1, Math.max(0, this.y + dy));
    }

    turn(dir: TurnDirection) {
        switch (dir) {
            case TurnDirection.RIGHT:
                this.facing = turnRight(this.facing);
                break;
            case TurnDirection.LEFT:
                this.facing = turnLeft(this.facing);
                break;
        }
    }
}
