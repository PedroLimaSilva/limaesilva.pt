import { Component, Input, OnInit, ElementRef, OnChanges } from '@angular/core';
import { particlesDarkTheme, particlesLightTheme } from './settings';

@Component({
    selector: 'app-background',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss'],
    host: {
        id: 'particles-bg'
    }
})
export class BackgroundComponent implements OnInit, OnChanges {

    @Input() theme:string;

    constructor(
        private element: ElementRef,
    ) {
    }

    ngOnInit() {
        this.setParticles();
    }

    ngOnChanges(){
        this.setParticles();
    }
    
    setParticles(){
        if(this.theme === 'dark'){
            particlesJS(this.element.nativeElement.id, particlesDarkTheme);
        } else if(this.theme === 'light'){
            particlesJS(this.element.nativeElement.id, particlesLightTheme);
        }
    }
}
