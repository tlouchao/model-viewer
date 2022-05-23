import {LIGHT_COLOR, 
        AMBIENT_DEF_INTENSITY} 
        from "constants/constants.js"
import Light from "./Light"
import Matrix from "./Matrix"

class AmbientLight extends Light {
    static actorType="ambient"
    constructor(matrix=new Matrix(), 
                color=LIGHT_COLOR,
                intensity=AMBIENT_DEF_INTENSITY){
    super(matrix, color)
    this.actorName="ambient"
    this.attributes["intensity"] = intensity
    }
}

export default AmbientLight