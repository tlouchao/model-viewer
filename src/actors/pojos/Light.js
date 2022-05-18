import { LIGHT_COLOR } from './../../constants/constants.js'
import Actor from './Actor'

class Light extends Actor {
    categoryType="primitive"
    color
    constructor(color=LIGHT_COLOR){
        super()
        this.color=color
        if (new.target === Light){
            throw new TypeError("implement abstract class Light")
        }
    }
}

export default Light