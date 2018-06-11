import * as mout from 'mout';

const parse = mout.queryString.parse;
const keys = mout.object.keys;

export class Settings {
    
    isMobile =  false;
    query = parse(window.location.href.replace('#','?'));
    useStats = false;

    amountMap = {
        '4k' : [64, 64, 0.29],
        '8k' : [128, 64, 0.42],
        '16k' : [128, 128, 0.48],
        '32k' : [256, 128, 0.55],
        '65k' : [256, 256, 0.6],
        '131k' : [512, 256, 0.85],
        '252k' : [512, 512, 1.2],
        '524k' : [1024, 512, 1.4],
        '1m' : [1024, 1024, 1.6],
        '2m' : [2048, 1024, 2],
        '4m' : [2048, 2048, 2.5]
    };
    
    amountList = keys(this.amountMap);

    constructor(){
        this.query.amount = this.amountMap[this.query.amount] ? this.query.amount : '65k';
        this.query.motionBlurQuality = this.motionBlurQualityMap[this.query.motionBlurQuality] ? this.query.motionBlurQuality : 'medium';
    }
    amountInfo = this.amountMap[this.query.amount];
    simulatorTextureWidth = this.amountInfo[0];
    simulatorTextureHeight = this.amountInfo[1];
    
    useTriangleParticles = false;
    followMouse = false;
    
    speed = 1;
    dieSpeed = 0.015;
    radius = this.amountInfo[2];
    curlSize = 0.02;
    attraction = 1;
    shadowDarkness = 0.45;
    
    bgColor = '#343434';
    color1 = '#ffffff';
    color2 = '#ffffff';
    
    fxaa = false;
    letmotionBlurQualityMap;
    motionBlurQualityMap = this.letmotionBlurQualityMap = {
        best: 1,
        high: 0.5,
        medium: 1 / 3,
        low: 0.25
    };
    letmotionBlurQualityList = keys(this.motionBlurQualityMap);
    
    letmotionBlur = false;
    letmotionBlurPause = true;
    letbloom = false;
    
}