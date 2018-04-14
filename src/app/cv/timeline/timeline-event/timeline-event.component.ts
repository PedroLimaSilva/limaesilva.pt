import { Component, OnInit, Input } from '@angular/core';

export interface TimelineEvent {
  thumbnail: String;
  type: String;
  title: String;
  start: String;
  end: String;
  short: String;
  description: String;
}

@Component({
  selector: 'timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.scss']
})
export class TimelineEventComponent implements OnInit {

  @Input() event: TimelineEvent;

  constructor() { }

  ngOnInit() {
  }

}
