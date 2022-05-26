import {PRIM_COLOR, 
        CYLINDER_DEF_HEIGHT,
        CYLINDER_DEF_RADIUS,
        CYLINDER_DEF_RADIUS_SEG} 
from "constants/constants.js"
import Primitive from "./Primitive"
import Matrix from "./Matrix"

class CylinderPrimitive extends Primitive {
    static actorType = "cylinder"
    constructor(matrix=new Matrix(),
                color=PRIM_COLOR,
                radiusTop=CYLINDER_DEF_RADIUS,
                radiusBot=CYLINDER_DEF_RADIUS,
                height=CYLINDER_DEF_HEIGHT,
                radiusSeg=CYLINDER_DEF_RADIUS_SEG){
        super(matrix, color)
        this.actorName="cylinder"
        this.attributes["radiusTop"]   = radiusTop,
        this.attributes["radiusBottom"]   = radiusBot,
        this.attributes["height"]      = height,
        this.attributes["radialSegments"]   = radiusSeg,
        this.attributesHelper()
    }
}

export default CylinderPrimitive