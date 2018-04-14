import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'timeline-badge',
  templateUrl: './timeline-badge.component.html',
  styleUrls: ['./timeline-badge.component.scss']
})
export class TimelineBadgeComponent implements OnInit {

  @Input() timestamp = '01/2000';
  @Input() type = 'work';

  constructor() { }

  ngOnInit() {
  }

}
