import {PRIMS_TYPES, 
        PRIM_COLOR, 
        CYLINDER_DEF_HEIGHT,
        CYLINDER_DEF_RADIUS } 
from './../../constants/constants.js'
import Primitive from './Primitive'

class CylinderPrimitive extends Primitive {
constructor(color=PRIM_COLOR,
            height=CYLINDER_DEF_HEIGHT,
            radius=CYLINDER_DEF_RADIUS){
    super(color)
    this.name=(PRIMS_TYPES.includes("cylinder")) ? "cylinder" : null
    this.type=(PRIMS_TYPES.includes("cylinder")) ? "cylinder" : null
    this.attributes["height"]   = height, 
    this.attributes["radius"]   = radius  
    }
}

export default CylinderPrimitive