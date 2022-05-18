import { CATEGORY_TYPES, LIGHT_COLOR } from './../../constants/constants.js'
import Actor from './Actor'

class Light extends Actor {
    color
    categoryType
    attributes = {}
    constructor(color=LIGHT_COLOR){
        super()
        this.color=color
        this.categoryType=(CATEGORY_TYPES.includes("light")) ? "light" : null
        if (new.target === Light){
            throw new TypeError("implement abstract class Light")
        }
    }
}

export default Light