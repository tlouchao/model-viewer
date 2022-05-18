import Matrix from './Matrix'

class Actor {
    name
    matrix = new Matrix()
    constructor(){
        if (new.target === Actor){
            throw new TypeError("implement abstract class Actor")
        }
    }
}

export default Actor