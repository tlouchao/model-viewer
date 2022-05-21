import {PRIM_COLOR, 
        CYLINDER_DEF_HEIGHT,
        CYLINDER_DEF_RADIUS } 
from 'constants/constants.js'
import Primitive from './Primitive'
import Matrix from './Matrix'

class CylinderPrimitive extends Primitive {
    constructor(matrix=new Matrix(),
                color=PRIM_COLOR,
                radius=CYLINDER_DEF_RADIUS,
                height=CYLINDER_DEF_HEIGHT){
    super(matrix, color)
    this.actorName="cylinder"
    this.actorType="cylinder"
    this.attributes["radius"]   = radius,
    this.attributes["height"]   = height 
    }
}

export default CylinderPrimitive