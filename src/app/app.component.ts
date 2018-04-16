import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { StatsService } from './stats.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    constructor(
        private _stats: StatsService
    ){
        if(environment.performanceDebug){
            _stats.addStats();
        }
    }
}
