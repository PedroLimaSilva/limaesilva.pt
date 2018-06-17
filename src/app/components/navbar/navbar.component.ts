import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

    isOpen: boolean;

    constructor(
        private navService: NavbarService
    ) {
        this.navService._isOpen.subscribe(
            state => {
                this.isOpen = state
            }
        );
    }

    ngOnInit() {
        if(window.innerWidth > 720){
            this.navService.open();
        }
    }

    ngOnDestroy(){
        this.navService._isOpen.unsubscribe();
    }

}
