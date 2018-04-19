import { Injectable } from '@angular/core';
import { Texture } from 'three';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ObjLoaderService {

    manager: THREE.LoadingManager;
    loader: THREE.OBJLoader;
    textureLoader: THREE.TextureLoader;

    currentlyLoaded: BehaviorSubject<THREE.Mesh>;

    TARGET_RADIUS = 4;

    constructor() {
        this.manager = new THREE.LoadingManager();
        this.loader = new THREE.OBJLoader(this.manager);
        this.textureLoader = new THREE.MTLLoader(this.manager);

        let geometry = new THREE.BoxBufferGeometry(1.5, 1.5, 1.5);
        let material = new THREE.MeshLambertMaterial({ color: '#0099ff' });
        let cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;

        cube.geometry.computeBoundingSphere();
        let objRadius = cube.geometry.boundingSphere.radius;
        console.log(cube, objRadius);

        this.currentlyLoaded = new BehaviorSubject<THREE.Mesh>(cube);
    }

    public getMesh(): BehaviorSubject<THREE.Mesh>{
        return this.currentlyLoaded;
    }


    public loadMesh(objPath?: string, objName?: string) {
        this.textureLoader.setPath('/assets/3d/');
        let texture = this.textureLoader.load('Topography.mtl', this.onLoadMaterials.bind(this));
    }

    private onLoadMaterials(materials){
        this.loader.setPath('/assets/3d/');
        this.loader.setMaterials(materials)
        let geometry = this.loader.load('Topography.obj', this.onLoad.bind(this));
    }

    onLoad(object){
        let objRadius;

        if(object.geometry){
            object.geometry.computeBoundingSphere();
            objRadius = object.geometry.boundingSphere.radius;
            object.receiveShadow = true;
            object.castShadow = true;
        }
        else{
            objRadius = 1;
            object.children.forEach(child => {
                child.geometry.computeBoundingSphere();
                let aux = child.geometry.boundingSphere.radius;
                if(aux > objRadius){
                    objRadius = aux;
                }
                child.receiveShadow = true;
                child.castShadow = true;
            });
        }
        console.log(object, objRadius);

        console.log(this.TARGET_RADIUS, objRadius, this.getNewScale(objRadius));
        let newScale = this.getNewScale(objRadius);
        object.scale.set(newScale, newScale, newScale);

        this.currentlyLoaded.next(object);
    }


    private getNewScale(currentRadius ){
        return this.TARGET_RADIUS / currentRadius;
    }
}
