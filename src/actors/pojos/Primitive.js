import { CATEGORY_TYPES, PRIM_COLOR } from './../../constants/constants.js'
import Actor from './Actor'

class Primitive extends Actor {
    color
    categoryType
    attributes = {}
    constructor(color=PRIM_COLOR){
        super()
        this.color=color
        this.categoryType=(CATEGORY_TYPES.includes("primitive")) ? "primitive" : null
        if (new.target === Primitive){
            throw new TypeError("implement abstract class Primitive")
        }
    }
}

export default Primitive