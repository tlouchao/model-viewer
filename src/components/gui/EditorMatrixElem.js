import React from "react"
import PropTypes from "prop-types"

const EditorMatrixElem = (props) => {

    return (
        <div className="matrix-elem">
            <input  id={props.id}
                    onBlur={props.handleBlur}
                    onChange={props.handleChange}
                    type="number" 
                    step="0.01"  
                    value={props.value}
                    min={props.min} 
                    max={props.max}  
                    required 
            />
        </div>
    )
}

EditorMatrixElem.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
}

export default EditorMatrixElem