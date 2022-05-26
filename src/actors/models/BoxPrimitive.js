import {PRIM_COLOR, 
        BOX_DEF_WIDTH, 
        BOX_DEF_HEIGHT, 
        BOX_DEF_DEPTH } 
    from "constants/constants.js"
import Primitive from "./Primitive"
import Matrix from "./Matrix"

class BoxPrimitive extends Primitive {
    static actorType="box"
    constructor(matrix=new Matrix(),
                color=PRIM_COLOR,
                width=BOX_DEF_WIDTH,
                height=BOX_DEF_HEIGHT,
                depth=BOX_DEF_DEPTH){
        super(matrix, color)
        this.actorName="box"
        this.attributes["width"]    = width, 
        this.attributes["height"]   = height, 
        this.attributes["depth"]    = depth
    }
}

export default BoxPrimitive