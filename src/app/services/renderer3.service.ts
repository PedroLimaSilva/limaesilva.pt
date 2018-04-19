import { Injectable } from '@angular/core';
import { Scene, PerspectiveCamera, Mesh, Color, WebGLRenderer, Vector3 } from 'three';

import { StatsService } from './stats.service';

@Injectable()
export class Renderer3Service {

    public scene: Scene;
    public camera: PerspectiveCamera;
    private renderer: WebGLRenderer;
    public subject: Mesh;

    private mousePos: {
        x: number,
        y: number
    }

    constructor(
        private stats: StatsService
    ) { }

    public init(container: HTMLElement, subject: Mesh, bg: Color) {

        this.scene = new THREE.Scene();
        this.scene.background = bg;

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.camera.up = new THREE.Vector3(0, 1, 0);
        if (window.innerWidth < 720) {
            this.camera.setViewOffset(window.innerWidth, window.innerHeight, 0, 0, window.innerWidth, window.innerHeight)
        }
        if (window.innerWidth >= 720) {
            this.camera.setViewOffset(window.innerWidth, window.innerHeight, -window.innerWidth / 3, 0, window.innerWidth, window.innerHeight)
        }
        this.mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        let ambientLight = new THREE.AmbientLight(0x404040); // soft white ambient light
        this.scene.add(ambientLight);

        let sunLight = new THREE.DirectionalLight(0xffffff, 1, 100);
        sunLight.position.set(-1, 5, 0);
        sunLight.lookAt(0,0,0)
        sunLight.castShadow = true;
        this.scene.add(sunLight);

        this.subject = subject;

        this.scene.add(this.subject);

        this.createFloor();

        // start animation
        this.animate();

        // bind to window resizes
        window.addEventListener('resize', _ => this.onResize());
        
        container.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        container.addEventListener('touchStart', this.onTouchStart.bind(this), false);
        container.addEventListener('touchEnd', this.onTouchEnd.bind(this), false);
        container.addEventListener('touchMove', this.onTouchMove.bind(this), false);
    
        container.appendChild(this.renderer.domElement);

        window['scene'] = this.scene;
    }

    public setSubject(obj: Mesh) {
        this.subject = obj;
    }

    createFloor() {
        let floorMaterial = new THREE.ShadowMaterial();
        floorMaterial.opacity = 0.5;
        let floor = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1000, 1000),
            floorMaterial
        );
        floor.rotation.x = -Math.PI / 2;
        //floor.position.y = -2;
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    animate() {
        window.requestAnimationFrame(_ => this.animate());

        this.stats.update();
        /*
        this.subject.rotation.x += 0.01;
        this.subject.rotation.y += 0.02;
        this.subject.rotation.z += 0.03;
        */
        this.animateCamera();

        this.renderer.render(this.scene, this.camera);
    }

    animateCamera() {
        this.camera.position.x += ( (this.mousePos.x/window.innerWidth)*3 - this.camera.position.x ) * 0.05;
        this.camera.position.y += ( - (this.mousePos.y/window.innerHeight)*1.5 - this.camera.position.y + 2) * 0.05;
        this.camera.lookAt( this.subject.position );
    }

    onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width < 720) {
            this.camera.setViewOffset(window.innerWidth, window.innerHeight, 0, 0, window.innerWidth, window.innerHeight)
        }
        if (width >= 720) {
            this.camera.setViewOffset(window.innerWidth, window.innerHeight, -window.innerWidth / 3, 0, window.innerWidth, window.innerHeight)
        }

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }


    onMouseMove(event) {
        this.mousePos = { x: event.clientX - window.innerWidth/2, y: event.clientY - window.innerHeight/2};
    }

    onTouchStart(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
            this.mousePos = { x: event.touches[0].pageX  - window.innerWidth/2, y: event.touches[0].pageY - window.innerHeight/2 };
        }
    }

    onTouchEnd(event) {
        this.mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }

    onTouchMove(event) {
        if (event.touches.length == 1) {
            event.preventDefault();
            this.mousePos = { x: event.touches[0].pageX - window.innerWidth/2, y: event.touches[0].pageY - window.innerHeight/2 };
        }
    }
}
