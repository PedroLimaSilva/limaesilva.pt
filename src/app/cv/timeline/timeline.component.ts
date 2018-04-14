import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimelineEvent } from './timeline-event/timeline-event.component';
import { TimelineService } from './timeline.service';

import 'rxjs/add/operator/takeWhile';


@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnDestroy {

  events: Array<TimelineEvent> = []

  private alive = true;

  constructor(
    private _tl: TimelineService
  ) {}

  ngOnInit() {
    this._tl.getEvents()
            .takeWhile( () => this.alive )
            .subscribe(
              data => this.events = data,
              error => console.log(error)
            );
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
