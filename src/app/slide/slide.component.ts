import { Component, OnInit, ElementRef } from '@angular/core';
import { Scene, PerspectiveCamera, Renderer, Mesh } from 'three';
import { Renderer3Service } from '../renderer3.service';
import { GuiService } from '../gui.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

    public message = 'hello';
    public bgColor = '#e0dacd';
    public subjectColor = '#0099ff';

    constructor(
        private element: ElementRef,
        private _renderer: Renderer3Service,
        private _gui: GuiService
    ) { }

    ngOnInit() {
        this._renderer.init(
            this.element.nativeElement,
            this.getSubject(),
            new THREE.Color(this.bgColor)
        );
        if(environment['performanceDebug']){
            this.setupGui();
        }
    }

    getSubject(){
        let geometry = new THREE.BoxBufferGeometry(1.5, 1.5, 1.5);
        let material = new THREE.MeshLambertMaterial({ color: this.subjectColor });
        let cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        // cube.position.x = 3;
        return cube;
    }

    setupGui(){
        this._gui.clearItems();
        this._gui.addElement(this, 'message');
        this._gui.addElement(this, 'floorColor');
        this._gui.addElement(this, 'subjectColor');
    }
}
