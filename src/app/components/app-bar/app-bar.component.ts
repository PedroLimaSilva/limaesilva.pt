import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';
import { BackgroundComponent } from '../../background/background.component';

@Component({
    selector: 'app-bar',
    templateUrl: './app-bar.component.html',
    styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit, OnDestroy {

    navOpen: boolean;
    @Input() currentTheme: string;

    @Output() theme = new EventEmitter<string>();

    constructor(
        private navService: NavbarService,
    ) {
        this.navService._isOpen.subscribe(
            state => {
                this.navOpen = state
            }
        );
    }

    ngOnInit() {
    }

    get themeIcon(){
        if(this.currentTheme === 'dark'){
            return '#lnr-sun';
        }else{
            return '#lnr-moon';
        }
    }

    get navIcon(){
        if(this.navOpen){
            return '#lnr-cross';
        } else {
            return '#lnr-menu';
        }
    }

    onClickNavToggle(){
        if(this.navOpen){
            this.navService.close();
        }else{
            this.navService.open();
        }
    }

    onClickThemeToggle(){
        this.theme.emit()
    }

    ngOnDestroy(){
        this.navService._isOpen.unsubscribe();
    }
}
