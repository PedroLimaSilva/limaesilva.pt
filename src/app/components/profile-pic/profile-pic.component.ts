import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss']
})
export class ProfilePicComponent implements OnInit {

  @Input() src: string = './assets/img/profile.gif'

  constructor() { }

  ngOnInit() {
  }

}
