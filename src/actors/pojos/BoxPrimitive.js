import {PRIMS_TYPES, 
        PRIM_COLOR, 
        BOX_DEF_WIDTH, 
        BOX_DEF_HEIGHT, 
        BOX_DEF_LENGTH } 
    from './../../constants/constants.js'
import Primitive from './Primitive'

class BoxPrimitive extends Primitive {
    constructor(color=PRIM_COLOR,
                width=BOX_DEF_WIDTH,
                height=BOX_DEF_HEIGHT,
                length=BOX_DEF_LENGTH){
        super(color)
        this.name=(PRIMS_TYPES.includes("box")) ? "box" : null
        this.actorType=(PRIMS_TYPES.includes("box")) ? "box" : null
        this.attributes["width"]    = width, 
        this.attributes["height"]   = height, 
        this.attributes["length"]   = length 
    }
}

export default BoxPrimitive