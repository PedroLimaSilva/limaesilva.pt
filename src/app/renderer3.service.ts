import { Injectable } from '@angular/core';
import { Scene, PerspectiveCamera, Renderer, Mesh, Color } from 'three';
import { StatsService } from './stats.service';

@Injectable()
export class Renderer3Service {

    public scene: Scene;
    public camera: PerspectiveCamera;
    renderer: Renderer;
    public subject: Mesh;
    public floor: Color

    constructor(
        private stats: StatsService
    ) { }

    public init(container: HTMLElement, subject: Mesh, floor: Color, bg: Color) {
        this.floor = floor;
        
        this.scene = new THREE.Scene();
        this.scene.background = bg;

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        

        let ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white ambient light
        this.scene.add( ambientLight );

        let pointLight = new THREE.PointLight(0xa0a0a0);
        pointLight.position.set(2, 2, 2);
        this.scene.add(pointLight);

        this.subject = subject;

        this.scene.add(this.subject);

        this.createFloor();

        // start animation
        this.animate();

        // bind to window resizes
        window.addEventListener('resize', _ => this.onResize());

        container.appendChild(this.renderer.domElement);
    }

    public setSubject(obj: Mesh){
        this.subject = obj;
    }

    createTestCube(): Mesh {
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        let cube = new THREE.Mesh(geometry, material);
        return cube;
    }

    createFloor(){ 
        let floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,1000), new THREE.MeshBasicMaterial({color: this.floor}));
        floor.rotation.x = -Math.PI/2;
        floor.position.y = -33;
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    animate() {
        window.requestAnimationFrame(_ => this.animate());

        this.stats.update();

        this.subject.rotation.x += 0.01;
        this.subject.rotation.y += 0.02;
        this.subject.rotation.z += 0.03;

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }
}
