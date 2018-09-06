import { Component, Inject, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    currentTheme = 'dark';
    isScrolled = false;
    scrollDelay: number = 1000;

    constructor() {
    }

    ngAfterViewInit() {
        const mainElement = document.getElementsByTagName('main')[0];
        this.updateTheme();
        const scrollThrotledStream = Observable.fromEvent(mainElement, 'scroll').throttleTime(this.scrollDelay);
        const scrollDebouncedStream = Observable.fromEvent(mainElement, 'scroll').debounceTime(this.scrollDelay);
        const scrollEventStream = Observable.merge(scrollDebouncedStream, scrollThrotledStream);        scrollEventStream.subscribe(
            (data:Event) => {
                this.handleScroll(data);
            }
        );
    }

    handleScroll(e: Event) {
        const scrollTop = e.target['scrollTop']
        if(scrollTop > 0){
            this.isScrolled = true; 
        }else{
            this.isScrolled = false;
        }
    }

    onThemeToggle() {
        if (this.currentTheme === 'dark') {
            this.currentTheme = 'light';
        } else if (this.currentTheme === 'light') {
            this.currentTheme = 'dark';
        }
        this.updateTheme();
    }

    updateTheme() {
        if (this.currentTheme === 'dark') {
            document.querySelector('body').classList.remove('theme-light');
            document.querySelector('body').classList.add('theme-dark');
        } else if (this.currentTheme === 'light') {
            document.querySelector('body').classList.remove('theme-dark');
            document.querySelector('body').classList.add('theme-light');
        }
    }
}
