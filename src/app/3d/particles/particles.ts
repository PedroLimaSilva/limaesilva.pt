import { ShaderHelpers } from '../shaderFunctions';

import { ParticlesShaders } from '../shaders/particles';

import { MeshMotionMaterial } from '../meshMotionMaterial';

export class ParticleSystem {

    _ShaderHelpers = new ShaderHelpers();
    _shaders = new ParticlesShaders();

    particleSize = 1

    material: THREE.ShaderMaterial;
    geometry: THREE.Geometry;

    system: THREE.Points;

    color1 = new THREE.Color(0xffffff);
    color2 = new THREE.Color(0xffffff);

    // Particle ammount
    public particleCount: number = 62000;

    public radius: number = 1;

    constructor() {
        this.system = this.createParticleMesh()
    }

    createParticleMesh() {

        var position = new Float32Array(this.particleCount * 3);
        var i3;
        for (var i = 0; i < this.particleCount; i++) {
            i3 = i * 3;
            position[i3 + 0] = (i % this.particleSize) / this.particleSize;
            position[i3 + 1] = ~~(i / this.particleSize) / this.particleSize;
        }
        var geometry = new THREE.BufferGeometry();
        geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));

        var material = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib.shadowmap,
                {
                    texturePosition: { type: 't', value: undefined },
                    color1: { type: 'c', value: undefined },
                    color2: { type: 'c', value: undefined }
                }
            ]),
            vertexShader: this._shaders.vertices,
            fragmentShader: this._shaders.fragment,
            blending: THREE.NoBlending
        });
        material.uniforms.color1.value = this.color1;
        material.uniforms.color2.value = this.color2;

        var mesh = new THREE.Points(geometry, material);

        mesh.customDistanceMaterial = new THREE.ShaderMaterial({
            uniforms: {
                lightPos: { type: 'v3', value: new THREE.Vector3(0, 0, 0) },
                texturePosition: { type: 't', value: undefined }
            },
            vertexShader: this._shaders.distanceVert,
            fragmentShader: this._shaders.distanceFragment,
            depthTest: true,
            depthWrite: true,
            side: THREE.BackSide,
            blending: THREE.NoBlending
        });

        mesh.motionMaterial = new MeshMotionMaterial({
            vertexShader: this._shaders.motion,
            depthTest: true,
            depthWrite: true,
            side: THREE.DoubleSide,
            blending: THREE.NoBlending
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }
}

