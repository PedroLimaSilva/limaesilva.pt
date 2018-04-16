import { Injectable } from '@angular/core';
import { GUI } from 'dat.gui';


@Injectable()
export class GuiService {

    gui: GUI;

    constructor() {
        this.clearItems();
    }

    public clearItems(){
        this.gui = new dat.GUI({name: 'Debug variables'});
    }

    public addElement(obj: Object, propName: string){
        this.gui.add(obj, propName);
    }
}
