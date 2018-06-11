

import { Component, OnInit, ElementRef } from '@angular/core';
import { Scene, PerspectiveCamera, Renderer, Mesh, Vector3 } from 'three';
import { Renderer3Service } from '../services/renderer3.service';
import { GuiService } from '../services/gui.service';
import { environment } from '../../environments/environment';
import { ObjLoaderService } from '../services/obj-loader.service';

import { ParticleSystem } from '../3d/particles/particles';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

    public message = 'hello';
    public bgColor = '#131313';


    constructor(
        private element: ElementRef,
        private _renderer: Renderer3Service,
        private _gui: GuiService,
        private _objLoader: ObjLoaderService
    ) {

     }

    ngOnInit() {
        let particles = true;
        if(particles) {
            let stars = new ParticleSystem().system;
            this._renderer.init(this.element.nativeElement, stars , new THREE.Color(this.bgColor));
        }
        else{
            this._renderer.init(this.element.nativeElement, this._objLoader.loadingObj, new THREE.Color(this.bgColor));
            this.getSubject();
        }
        if(environment['performanceDebug']){
            this.setupGui();
        }
    }

    getSubject(){
        
        this._objLoader
            .getMesh()
            .subscribe(
                mesh => {
                    this._renderer.setScene(
                        mesh,
                        new THREE.Color(this.bgColor)
                    );
                    this._renderer.setcameraHeight(2);
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
