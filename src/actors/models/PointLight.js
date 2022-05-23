import {LIGHT_COLOR, 
        POINT_DEF_INTENSITY,
        POINT_DEF_DISTANCE} 
        from "constants/constants.js"
import Light from "./Light"
import Matrix from "./Matrix"

class PointLight extends Light {
    static actorType="point"
    constructor(matrix=new Matrix(),
                color=LIGHT_COLOR,
                intensity=POINT_DEF_INTENSITY,
                distance=POINT_DEF_DISTANCE){
    super(matrix, color)
    this.actorName="point"
    this.attributes["intensity"] = intensity
    this.attributes["distance"] = distance
    }
}

export default PointLight