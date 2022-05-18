import { LIGHT_COLOR } from './../../constants/constants.js'
import Light from './Light'

class PointLight extends Light {
    intensity
    distance
    constructor(color=LIGHT_COLOR, intensity=1, distance=1){
        super(color)
        this.intensity = intensity
        this.distance = distance
    }
}

export default PointLight