export class ParticlesShaders {
    vertices = `
        uniform sampler2D texturePosition;
        
        varying float vLife;
        // chunk(shadowmap_pars_vertex);
        
        void main() {
        
            vec4 positionInfo = texture2D( texturePosition, position.xy );
        
            vec4 worldPosition = modelMatrix * vec4( positionInfo.xyz, 1.0 );
            vec4 mvPosition = viewMatrix * worldPosition;
        
            // chunk(shadowmap_vertex);
        
            vLife = positionInfo.w;
            gl_PointSize = 1300.0 / length( mvPosition.xyz ) * smoothstep(0.0, 0.2, positionInfo.w);
        
            gl_Position = projectionMatrix * mvPosition;
        
        }
    `;
    fragment = `
        // chunk(common);
        // chunk(fog_pars_fragment);
        // chunk(shadowmap_pars_fragment);
        
        varying float vLife;
        uniform vec3 color1;
        uniform vec3 color2;
        
        void main() {
        
            vec3 outgoingLight = mix(color2, color1, smoothstep(0.0, 0.7, vLife));
        
            // chunk(shadowmap_fragment);
            vec3 shadowMask = vec3( 1.0 );
            outgoingLight *= shadowMask;//pow(shadowMask, vec3(0.75));
        
            // chunk(fog_fragment);
            // chunk(linear_to_gamma_fragment);
        
            gl_FragColor = vec4( outgoingLight, 1.0 );
        
        }
    `;

    distanceVert = `
        uniform sampler2D texturePosition;

        varying vec4 vWorldPosition;

        void main() {

            vec4 positionInfo = texture2D( texturePosition, position.xy );

            vec4 worldPosition = modelMatrix * vec4( positionInfo.xyz, 1.0 );
            vec4 mvPosition = viewMatrix * worldPosition;

            gl_PointSize = 50.0 / length( mvPosition.xyz );

            vWorldPosition = worldPosition;

            gl_Position = projectionMatrix * mvPosition;

        }
    `;

    distanceFragment = `
        uniform vec3 lightPos;
        varying vec4 vWorldPosition;
        
        //chunk(common);
        
        vec4 pack1K ( float depth ) {
        
        depth /= 1000.0;
        const vec4 bitSh = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );
        const vec4 bitMsk = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );
        vec4 res = fract( depth * bitSh );
        res -= res.xxyz * bitMsk;
        return res;
        
        }
        
        float unpack1K ( vec4 color ) {
        
        const vec4 bitSh = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );
        return dot( color, bitSh ) * 1000.0;
        
        }
        
        void main () {
        
        gl_FragColor = pack1K( length( vWorldPosition.xyz - lightPos.xyz ) );
        
        }
    `;

    motion = `
        uniform sampler2D texturePosition;
        uniform sampler2D texturePrevPosition;
        
        uniform mat4 u_prevModelViewMatrix;
        
        varying vec2 v_motion;
        
        void main() {
        
            vec4 positionInfo = texture2D( texturePosition, position.xy );
            vec4 prevPositionInfo = texture2D( texturePrevPosition, position.xy );
        
        
            vec4 mvPosition = modelViewMatrix * vec4( positionInfo.xyz, 1.0 );
            gl_PointSize = 1300.0 / length( mvPosition.xyz ) * smoothstep(0.0, 0.2, positionInfo.w);
        
            vec4 pos = projectionMatrix * mvPosition;
            vec4 prevPos = projectionMatrix * u_prevModelViewMatrix * vec4(prevPositionInfo.xyz, 1.0);
            v_motion = (pos.xy / pos.w - prevPos.xy / prevPos.w) * 0.5 * step(positionInfo.w, prevPositionInfo.w);
        
            gl_Position = pos;
        
        }    
    `
}