
import {DEF_TRANSLATE,
        DEF_ROTATE,
        DEF_SCALE} from "constants/constants"
import Vector from "./Vector"

class Matrix {
    translate
    rotate
    scale
    constructor(translate=new Vector(DEF_TRANSLATE, DEF_TRANSLATE, DEF_TRANSLATE),
                rotate=new Vector(DEF_ROTATE, DEF_ROTATE, DEF_ROTATE),
                scale=new Vector(DEF_SCALE, DEF_SCALE, DEF_SCALE)){
        this.translate = translate
        this.rotate = rotate
        this.scale =scale
    }
}

export default Matrix