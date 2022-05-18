import {LIGHTS_TYPES, 
    LIGHT_COLOR, 
    POINT_DEF_INTENSITY,
    POINT_DEF_DISTANCE} 
    from './../../constants/constants.js'
import Light from './Light'

class PointLight extends Light {
    constructor(color=LIGHT_COLOR,
            intensity=POINT_DEF_INTENSITY,
            distance=POINT_DEF_DISTANCE){
    super(color)
    this.name=(LIGHTS_TYPES.includes("point")) ? "point" : null
    this.actorType=(LIGHTS_TYPES.includes("point")) ? "point" : null
    this.attributes["intensity"] = intensity
    this.attributes["distance"] = distance
    }
}

export default PointLight