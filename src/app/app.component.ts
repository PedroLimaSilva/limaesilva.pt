import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @HostBinding('style.background') background: string;

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
            this.background = '#2c2c2c';
            document.querySelector('body').classList.remove('theme-light');
            document.querySelector('body').classList.add('theme-dark');
        }else if(this.currentTheme === 'light'){
            this.background = '#fff';
            document.querySelector('body').classList.remove('theme-dark');
            document.querySelector('body').classList.add('theme-light');
        }
        console.log('updated', this.background)
    }
}
