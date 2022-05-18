import {PRIMS_TYPES, 
        PRIM_COLOR,
        TORUS_DEF_RADIUS,
        TORUS_DEF_TUBE,
        TORUS_DEF_RADIUS_SEG,
        TORUS_DEF_TUBE_SEG } 
from './../../constants/constants.js'
import Primitive from './Primitive'

class TorusPrimitive extends Primitive {
    constructor(color=PRIM_COLOR,
            radius=TORUS_DEF_RADIUS,
            tube=TORUS_DEF_TUBE,
            radiusSeg=TORUS_DEF_RADIUS_SEG,
            tubeSeg=TORUS_DEF_TUBE_SEG){
    super(color)
    this.name=(PRIMS_TYPES.includes("torus")) ? "torus" : null
    this.actorType=(PRIMS_TYPES.includes("torus")) ? "torus" : null
    this.attributes["radius"]   = radius, 
    this.attributes["tube"]     = tube, 
    this.attributes["radiusSeg"]   = radiusSeg, 
    this.attributes["tubeSeg"]     = tubeSeg 
    }
}

export default TorusPrimitive