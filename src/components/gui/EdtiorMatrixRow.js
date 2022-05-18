import React from "react"
import EditorMatrixElem from "./EditorMatrixElem"
import { MAT_ROW_LEN } from "../../constants/constants";

const EditorMatrixRow = (props) => {
    return (
        <div className="matrix-row-container">
            <p className="matrix-row-name">{props.name}</p>
            <div className="matrix-row-elems">
            {[...Array(MAT_ROW_LEN)].map((x, i) =>
                <EditorMatrixElem key={i}
                            defaultValue={props.defaultValue}
                            min={props.min}
                            max={props.max}
                 />
            )}
            </div>
        </div>
    )
}

export default EditorMatrixRow