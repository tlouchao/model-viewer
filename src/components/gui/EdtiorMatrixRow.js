import React from "react"
import PropTypes from "prop-types"
import { MAT_ROW_LEN } from "../../constants/constants"

const EditorMatrixRow = (props) => {

    return (
        <div className="matrix-row-container">
            <p className="matrix-row-name">{props.name}</p>
            <div className="matrix-row-elems">
                {[...Array(MAT_ROW_LEN)].map((x, i) =>
                    <div key={i} className="matrix-elem">
                        <input  onBlur={props.handleBlur}
                                type="number" 
                                step="0.01" 
                                defaultValue={props.defaultValue} 
                                min={props.min} 
                                max={props.max}  
                                required 
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

EditorMatrixRow.propTypes = {
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    max: PropTypes.string.isRequired,
    handleBlur: PropTypes.func.isRequired,
}

export default EditorMatrixRow