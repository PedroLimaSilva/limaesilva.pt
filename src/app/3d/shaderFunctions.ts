// var THREE = require('three');

export class ShaderHelpers {

    threeChunkReplaceRegExp = /\/\/\s?chunk_replace\s(.+)([\d\D]+)\/\/\s?end_chunk_replace/gm;
    threeChunkRegExp = /\/\/\s?chunk\(\s?(\w+)\s?\);/g;
    // var glslifyBugFixRegExp = /(_\d+_\d+)(_\d+_\d+)+/g;
    // var glslifyGlobalRegExp = /GLOBAL_VAR_([^_\.\)\;\,\s]+)(_\d+_\d+)?/g;
    glslifyGlobalRegExp = /GLOBAL_VAR_([^_\.\)\;\,\s]+)(_\d+)?/g;
    
    _chunkReplaceObj;
    
    constructor(){}
    
    _storeChunkReplaceParse(shader) {
        this._chunkReplaceObj = {};
        return shader.replace(this.threeChunkReplaceRegExp, this._storeChunkReplaceFunc);
    }
    
    _threeChunkParse(shader) {
        return shader.replace(this.threeChunkRegExp, (a,b)=>{
            this._replaceThreeChunkFunc(a,b)
        });
    }
    
    // function _glslifyBugFixParse(shader) {
    //     return shader.replace(glslifyBugFixRegExp, _returnFirst);
    // }
    
    _glslifyGlobalParse(shader) {
        return shader.replace(this.glslifyGlobalRegExp, this._returnFirst);
    }
    
    _storeChunkReplaceFunc(a, b, c) {
        this._chunkReplaceObj[b.trim()] = c;
        return '';
    }
    
    _replaceThreeChunkFunc(a, b) {
        let str = THREE.ShaderChunk[b] + '\n';
        for(let id in this._chunkReplaceObj) {
            console.log(id);
            str = str.replace(id, this._chunkReplaceObj[id]);
        }
        return str;
    }
    
    _returnFirst(a, b) {
        return b;
    }
    
    public parse(shader) {
        shader = this._storeChunkReplaceParse(shader);
        shader = this._threeChunkParse(shader);
        // shader = _glslifyBugFixParse(shader);
        return this._glslifyGlobalParse(shader);
    }
}