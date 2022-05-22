import { PRIM_COLOR } from "constants/constants.js"
import Actor from "./Actor"
import Matrix from "./Matrix"

class Primitive extends Actor {
    categoryType = "primitive"
    constructor(matrix=new Matrix(), color=PRIM_COLOR){
        super(matrix, color)
        if (new.target === Primitive){
            throw new TypeError("implement abstract class Primitive")
        }
    }
}

export default Primitive