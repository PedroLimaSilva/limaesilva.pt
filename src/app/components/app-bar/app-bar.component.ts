import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';

@Component({
    selector: 'app-bar',
    templateUrl: './app-bar.component.html',
    styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit, OnDestroy {

    navOpen: boolean;

    constructor(
        private navService: NavbarService
    ) {
        this.navService._isOpen.subscribe(
            state => {
                this.navOpen = state
            }
        );
    }

    ngOnInit() {
    }

    onClickToggle(){
        if(this.navOpen){
            this.navService.close();
        }else{
            this.navService.open();
        }
    }

    ngOnDestroy(){
        this.navService._isOpen.unsubscribe();
    }
}
