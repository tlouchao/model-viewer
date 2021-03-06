import React from "react"
import PropTypes from "prop-types"
import EditorMatrixElem from "./EditorMatrixElem"

const EditorMatrixRow = (props) => {

    return (
        <div className="matrix-row-container" id={`${props.name.toLowerCase()}-row`}>
            <p className="matrix-row-name">{props.name}</p>
            <div className="matrix-row-elems">
                {Object.keys(props.row).map(k =>
                    <EditorMatrixElem key={k}
                        id={`${props.name.toLowerCase()}-${k}`}
                        handleChange={props.handleChange}
                        handleBlur={props.handleBlur}
                        type="number" 
                        step="0.01"  
                        value={props.row[k]}
                        min={props.min} 
                        max={props.max}  
                        required
                    />
                )}
            </div>
        </div>
    )
}

EditorMatrixRow.propTypes = {
    name: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
}

export default EditorMatrixRow