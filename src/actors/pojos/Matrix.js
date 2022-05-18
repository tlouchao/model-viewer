
import {DEF_TRANSLATE, DEF_ROTATE, DEF_SCALE} from "./../../constants/constants"
import Vector from "./Vector"

class Matrix {
    translate;
    rotate;
    scale;
    constructor(){
        this.translate = new Vector(
            DEF_TRANSLATE,
            DEF_TRANSLATE,
            DEF_TRANSLATE)
        this.rotate = new Vector(
            DEF_ROTATE,
            DEF_ROTATE,
            DEF_ROTATE)
        this.scale = new Vector(
            DEF_SCALE,
            DEF_SCALE,
            DEF_SCALE)
    }
}

export default Matrix