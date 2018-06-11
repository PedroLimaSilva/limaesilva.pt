import { MotionShaders } from './shaders/motion';

import * as mout from 'mout';

export function MeshMotionMaterial ( parameters ) {

    parameters = parameters || {};

    var uniforms = parameters.uniforms || {};
    var vertexShader = new MotionShaders().vertices;
    var fragmentShader = new MotionShaders().fragment;
    this.motionMultiplier = parameters.motionMultiplier || 1;

    THREE.ShaderMaterial.call( this, mout.object.mixIn({

        uniforms: mout.object.fillIn(uniforms, {
            u_prevModelViewMatrix: {type: 'm4', value: new THREE.Matrix4()},
            u_motionMultiplier: {type: 'f', value: 1}
        }),
        vertexShader : vertexShader,
        fragmentShader : fragmentShader

    }, parameters));

}

var _p = MeshMotionMaterial.prototype = Object.create( THREE.ShaderMaterial.prototype );
_p.constructor = MeshMotionMaterial;
