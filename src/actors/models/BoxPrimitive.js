import {PRIM_COLOR, 
        BOX_DEF_WIDTH, 
        BOX_DEF_HEIGHT, 
        BOX_DEF_LENGTH } 
    from 'constants/constants.js'
import Primitive from './Primitive'
import Matrix from './Matrix'

class BoxPrimitive extends Primitive {
    constructor(matrix=new Matrix(),
                color=PRIM_COLOR,
                width=BOX_DEF_WIDTH,
                height=BOX_DEF_HEIGHT,
                length=BOX_DEF_LENGTH){
        super(matrix, color)
        this.actorName="box"
        this.actorType="box"
        this.attributes["width"]    = width, 
        this.attributes["height"]   = height, 
        this.attributes["length"]   = length 
    }
}

export default BoxPrimitive