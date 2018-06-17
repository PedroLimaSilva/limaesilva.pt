import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentTheme = 'dark';

    constructor() {
        this.updateTheme()
    }

    onThemeToggle(){
        if(this.currentTheme === 'dark'){
            this.currentTheme = 'light';
        }else if(this.currentTheme === 'light'){
            this.currentTheme = 'dark';
        }
        this.updateTheme();
    }

    updateTheme(){
        if(this.currentTheme === 'dark'){
            document.querySelector('body').classList.remove('theme-light');
            document.querySelector('body').classList.add('theme-dark');
        }else if(this.currentTheme === 'light'){
            document.querySelector('body').classList.remove('theme-dark');
            document.querySelector('body').classList.add('theme-light');
        }
    }
}
