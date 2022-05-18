import React from "react"
import { MAT_ROW_LEN } from "../../constants/constants";

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

export default EditorMatrixRow