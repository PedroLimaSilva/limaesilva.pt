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
        this.camera.up = new THREE.Vector3(0,1,0);
        this.mousePos = {x: window.innerWidth/2, y: window.innerHeight/2}

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
        this.renderer.setSize(window.innerWidth, window.innerHeight);


        let ambientLight = new THREE.AmbientLight(0x404040); // soft white ambient light
        this.scene.add(ambientLight);

        let sunLight = new THREE.DirectionalLight(0xffffff, 1, 100);
        sunLight.position.set(0, 1, 0);
        sunLight.castShadow = true;
        this.scene.add(sunLight);

        //Set up shadow properties for the light
        // sunLight.shadow.mapSize.width = 512;  // default
        // sunLight.shadow.mapSize.height = 512; // default
        // sunLight.shadow.camera.near = 0.5;       // default
        // sunLight.shadow.camera.far = 500      // default

        this.subject = subject;

        this.scene.add(this.subject);

        this.createFloor();

        // start animation
        this.animate();

        // bind to window resizes
        window.addEventListener('resize', _ => this.onResize());
        container.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );

        container.appendChild(this.renderer.domElement);
    }

    public setSubject(obj: Mesh) {
        this.subject = obj;
    }

    createTestCube(): Mesh {
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        let cube = new THREE.Mesh(geometry, material);
        return cube;
    }

    createFloor() {
        let floorMaterial = new THREE.ShadowMaterial();
        floorMaterial.opacity = 0.5;
        let floor = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1000, 1000),
            floorMaterial
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -2;
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    animate() {
        window.requestAnimationFrame(_ => this.animate());

        this.stats.update();

        this.subject.rotation.x += 0.01;
        this.subject.rotation.y += 0.02;
        this.subject.rotation.z += 0.03;

        this.animateCamera();

        this.renderer.render(this.scene, this.camera);
    }

    animateCamera(){
        if(this.mousePos.x > window.innerWidth/2 && this.camera.rotation.y < 0.25){
            this.camera.rotation.y += 0.01;
        }
        if(this.mousePos.x < window.innerWidth/2 && this.camera.rotation.y > -0.25){
            this.camera.rotation.y += -0.01;
        }
        if(this.mousePos.y > window.innerHeight/2 && this.camera.rotation.x < 0.07){
            this.camera.rotation.x += 0.01;
        }
        if(this.mousePos.y < window.innerHeight/2 && this.camera.rotation.x > -0.07){
            this.camera.rotation.x += -0.01;
        }
    }

    onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    onMouseMove(event) {
        this.mousePos = { x: event.clientX, y: event.clientY};
    }

    onTouchStart(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
            this.mousePos = { x: event.touches[0].pageX, y: event.touches[0].pageY };
        }
    }

    onTouchEnd(event) {
        this.mousePos = { x: window.innerWidth/2, y: window.innerHeight/2 };
    }

    onTouchMove(event) {
        if (event.touches.length == 1) {
          event.preventDefault();
              this.mousePos = {x:event.touches[0].pageX, y:event.touches[0].pageY };
        }
      }

}
