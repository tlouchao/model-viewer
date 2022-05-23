import { LIGHT_COLOR } from "constants/constants.js"
import Actor from "./Actor"
import Matrix from "./Matrix"

class Light extends Actor {
    static categoryType = "light"
    constructor(matrix=new Matrix(), color=LIGHT_COLOR){
        super(matrix, color)
        if (new.target === Light){
            throw new TypeError("implement abstract class Light")
        }
    }
}

export default Light