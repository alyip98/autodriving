import { Car } from './car.js';

export class Field {
    width: number = 0;
    height: number = 0;
    cars: Car[] = [];
    stepNumber = 0;
    // track cars by position key for efficient collision checking
    carPositions: Record<string, Car[]> = {};

    addCar(activeCar: Car) {
        this.cars.push(activeCar);
        this.addCarPosition(activeCar);
    }

    updateCarPosition(car: Car, prevX: number, prevY: number) {
        const key = this.getPositionKey(prevX, prevY);
        const newKey = this.getPositionKey(car.x, car.y);
        if (key === newKey) return;
        const idx = this.carPositions[key].indexOf(car);
        if (idx !== -1) {
            this.carPositions[key].splice(idx, 1);
        }
        this.addCarPosition(car);
    }

    addCarPosition(car: Car) {
        const key = this.getPositionKey(car.x, car.y);
        if (!this.carPositions[key]) this.carPositions[key] = [];
        this.carPositions[key].push(car);
    }

    getPositionKey(x: number, y: number): string {
        return `(${x},${y})`;
    }

    simulate() {
        // todo
        let finished = false;
        while (!finished) {
            let updated = 0;
            for (let i = 0; i < this.cars.length; i++) {
                const car = this.cars[i];
                if (!car.isActive) continue;
                updated += 1;
                const prevX = car.x;
                const prevY = car.y;
                car.step(this.stepNumber, this.width, this.height);
                this.updateCarPosition(car, prevX, prevY);
                this.checkCollisions(car);
            }
            this.stepNumber++;
            finished = updated === 0;
        }
    }

    checkCollisions(car: Car) {
        const key = this.getPositionKey(car.x, car.y);
        const candidateCars = this.carPositions[key];
        if (candidateCars.length <= 1) return;
        for (let i = 0; i < candidateCars.length; i++) {
            const other = candidateCars[i];
            if (other === car) continue;
            // if (other.isActive) {
            //     if (other.facing)
            // }

            // collision
            car.hasCollided = true;
            car.isActive = false;
            car.collisionInfo = {
                x: car.x,
                y: car.y,
                stepNumber: this.stepNumber + 1,
                targetName: other.name,
            };

            other.hasCollided = true;
            other.isActive = false;
            if (!other.collisionInfo)
                other.collisionInfo = {
                    x: car.x,
                    y: car.y,
                    stepNumber: this.stepNumber + 1,
                    targetName: car.name,
                };
        }
    }
}
