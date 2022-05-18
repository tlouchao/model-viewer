import {LIGHTS_TYPES, 
        LIGHT_COLOR, 
        AMBIENT_DEF_INTENSITY} 
        from './../../constants/constants.js'
import Light from './Light'

class AmbientLight extends Light {
    constructor(color=LIGHT_COLOR,
            intensity=AMBIENT_DEF_INTENSITY){
    super(color)
    this.name=(LIGHTS_TYPES.includes("ambient")) ? "ambient" : null
    this.actorType=(LIGHTS_TYPES.includes("ambient")) ? "ambient" : null
    this.attributes["intensity"] = intensity
    }
}

export default AmbientLight