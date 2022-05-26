import Matrix from "./Matrix"
import {SEG_MIN, SEG_MAX, SEG_STEP,
        ATTR_MIN, ATTR_MAX, ATTR_STEP} from "constants/constants.js"

class Actor {
    color
    actorName
    static actorType
    matrix
    attributes = {}
    constructor(matrix=new Matrix(), color="#000000"){
        if (new.target === Actor){
            throw new TypeError("implement abstract class Actor")
        }
        this.color=color
        this.matrix=matrix
    }
    attributesHelper = () => {
        for (const [k, v] of Object.entries(this.attributes)){
            this.attributes[k] = {}
            this.attributes[k].data = v
            if (k.includes("Seg")){
                this.attributes[k].min = SEG_MIN
                this.attributes[k].max = SEG_MAX
                this.attributes[k].step = SEG_STEP
            } else {
                this.attributes[k].min = ATTR_MIN
                this.attributes[k].max = ATTR_MAX
                this.attributes[k].step = ATTR_STEP
            }
        }
    }
}

export default Actor