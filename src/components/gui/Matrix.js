import React from "react"
import MatrixRow from "./MatrixRow"
import * as constants from "./../../constants/constants";

const Matrix = () => {
    return (
        <div className="matrix">
            <MatrixRow name="Translate" 
                defaultValue={parseFloat(constants.DEF_TRANSLATE).toFixed(2)}
                min={parseFloat(constants.MIN_TRANSLATE).toFixed(2)} 
                max={parseFloat(constants.MAX_TRANSLATE).toFixed(2)}  
            />
            <MatrixRow name="Rotate" 
                defaultValue={parseFloat(constants.DEF_ROTATE).toFixed(2)} 
                min={parseFloat(constants.MIN_ROTATE).toFixed(2)} 
                max={parseFloat(constants.MAX_ROTATE).toFixed(2)} 
            />
            <MatrixRow name="Scale" 
                defaultValue={parseFloat(constants.DEF_SCALE).toFixed(2)} 
                min={parseFloat(constants.MIN_SCALE).toFixed(2)} 
                max={parseFloat(constants.MAX_SCALE).toFixed(2)} 
            />
        </div>
    )
}

export default Matrix