import { Renderer3Service } from './3d_background';

let background = new Renderer3Service();

let bgColor = '#131313';
let subjectColor = '#0099ff';

let geometry = new THREE.BoxBufferGeometry(1.5, 1.5, 1.5);
let material = new THREE.MeshLambertMaterial({ color: subjectColor });
let cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;



background.init(document, cube, new THREE.Color(this.bgColor))