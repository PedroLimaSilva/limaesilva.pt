export class MotionShaders {
    vertices = `
        // chunk(morphtarget_pars_vertex);
        // chunk(skinning_pars_vertex);

        uniform mat4 u_prevModelViewMatrix;

        varying vec2 v_motion;

        void main() {

            // chunk(skinbase_vertex);
            // chunk(begin_vertex);

            // chunk(morphtarget_vertex);
            // chunk(skinning_vertex);

            vec4 pos = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
            vec4 prevPos = projectionMatrix * u_prevModelViewMatrix * vec4( transformed, 1.0 );
            gl_Position = pos;
            v_motion = (pos.xy / pos.w - prevPos.xy / prevPos.w) * 0.5;

        }
    `;
    fragment = `
        uniform float u_motionMultiplier;

        varying vec2 v_motion;

        void main() {

                gl_FragColor = vec4( v_motion * u_motionMultiplier, gl_FragCoord.z, 1.0 );

        }
    `;
}