import Matrix from "./Matrix"

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
}

export default Actor