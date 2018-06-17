import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { particlesParams } from './settings';

@Component({
    selector: 'app-background',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss'],
    host: {
        id: 'particles-bg'
    }
})
export class BackgroundComponent implements OnInit {

    public message = 'hello';
    public bgColor = '#2c2c2c';

    constructor(
        private element: ElementRef,
    ) {
    }

    ngOnInit() {
        particlesJS(this.element.nativeElement.id, particlesParams);
        window.document.body.style.background = this.bgColor;
    }
}
