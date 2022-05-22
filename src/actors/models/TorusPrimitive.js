import {PRIM_COLOR,
        TORUS_DEF_RADIUS,
        TORUS_DEF_TUBE,
        TORUS_DEF_RADIUS_SEG,
        TORUS_DEF_TUBE_SEG } 
from "constants/constants.js"
import Primitive from "./Primitive"
import Matrix from "./Matrix"

class TorusPrimitive extends Primitive {
    constructor(matrix=new Matrix(),
                color=PRIM_COLOR,
                radius=TORUS_DEF_RADIUS,
                tube=TORUS_DEF_TUBE,
                radiusSeg=TORUS_DEF_RADIUS_SEG,
                tubeSeg=TORUS_DEF_TUBE_SEG){
    super(matrix, color)
    this.actorName="torus"
    this.actorType="torus"
    this.attributes["radius"]   = radius, 
    this.attributes["tube"]     = tube, 
    this.attributes["radiusSeg"]   = radiusSeg, 
    this.attributes["tubeSeg"]     = tubeSeg 
    }
}

export default TorusPrimitive