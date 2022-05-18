import {PRIMS_TYPES, 
        PRIM_COLOR, 
        CYLINDER_DEF_HEIGHT,
        CYLINDER_DEF_RADIUS } 
from './../../constants/constants.js'
import Primitive from './Primitive'

class CylinderPrimitive extends Primitive {
    constructor(color=PRIM_COLOR,
            radius=CYLINDER_DEF_RADIUS,
            height=CYLINDER_DEF_HEIGHT){
    super(color)
    this.name=(PRIMS_TYPES.includes("cylinder")) ? "cylinder" : null
    this.actorType=(PRIMS_TYPES.includes("cylinder")) ? "cylinder" : null
    this.attributes["radius"]   = radius,
    this.attributes["height"]   = height 
    }
}

export default CylinderPrimitive