import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavbarService {

    public _isOpen = new Subject<boolean>();

    constructor() { }

    public open(){
        this._isOpen.next(true);
        document.querySelector('body').classList.add('nav-open');
    }

    public close(){
        this._isOpen.next(false);
        document.querySelector('body').classList.remove('nav-open');
    }



}
