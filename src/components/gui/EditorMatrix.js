import React from "react"
import PropTypes from "prop-types"
import EditorMatrixRow from "./EdtiorMatrixRow"
import {MIN_TRANSLATE, MAX_TRANSLATE,
        MIN_ROTATE, MAX_ROTATE,
        MIN_SCALE, MAX_SCALE} from "../../constants/constants"

const EditorMatrix = (props) => {

    return (
        <div className="matrix">
            <EditorMatrixRow name="Translate"
                handleChange={props.handleChange}
                handleBlur={props.handleBlur}
                min={parseFloat(MIN_TRANSLATE).toFixed(2)} 
                max={parseFloat(MAX_TRANSLATE).toFixed(2)} 
                row={props.matrix.translate} 
            />
            <EditorMatrixRow name="Rotate"
                handleChange={props.handleChange}
                handleBlur={props.handleBlur}
                min={parseFloat(MIN_ROTATE).toFixed(2)} 
                max={parseFloat(MAX_ROTATE).toFixed(2)} 
                row={props.matrix.rotate} 
            />
            <EditorMatrixRow name="Scale"
                handleChange={props.handleChange}
                handleBlur={props.handleBlur}
                min={parseFloat(MIN_SCALE).toFixed(2)} 
                max={parseFloat(MAX_SCALE).toFixed(2)} 
                row={props.matrix.scale} 
            />
        </div>
    )
}

EditorMatrix.propTypes = {
    matrix: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
}

export default EditorMatrix