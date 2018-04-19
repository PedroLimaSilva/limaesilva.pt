import { Injectable } from '@angular/core';

@Injectable()
export class StatsService {

    stats: Stats;

    constructor() {
     }

    public addStats() {
        this.stats = new Stats();
        document.body.appendChild(this.stats.domElement);
    }


    public update() {
        this.stats.update();
    }

}
