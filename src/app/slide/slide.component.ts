import { Component, OnInit, ElementRef } from '@angular/core';
import { Scene, PerspectiveCamera, Renderer, Mesh, Vector3 } from 'three';
import { Renderer3Service } from '../services/renderer3.service';
import { GuiService } from '../services/gui.service';
import { environment } from '../../environments/environment';
import { ObjLoaderService } from '../services/obj-loader.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

    public message = 'hello';
    public bgColor = '#131313';


    constructor(
        private element: ElementRef,
        private _renderer: Renderer3Service,
        private _gui: GuiService,
        private _objLoader: ObjLoaderService
    ) { }

    ngOnInit() {
        this.getSubject();
        if(environment['performanceDebug']){
            this.setupGui();
        }
    }

    getSubject(){

        this._objLoader
            .getMesh()
            .subscribe(
                mesh => {
                    this._renderer.init(
                        this.element.nativeElement,
                        mesh,
                        new THREE.Color(this.bgColor)
                    );
                }
            );
        this._objLoader.loadMesh('/assets/3d/', 'Topography')
    }

    setupGui(){
        this._gui.clearItems();
        this._gui.addElement(this, 'message');
        this._gui.addElement(this, 'floorColor');
        this._gui.addElement(this, 'subjectColor');
    }
}
