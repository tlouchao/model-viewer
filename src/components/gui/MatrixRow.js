import React from "react"
import MatrixElem from "./MatrixElem"
import { MAT_ROW_LEN } from "./../../constants/constants";

const MatrixRow = (props) => {
    return (
        <div className="matrix-row-container">
            <p className="matrix-row-name">{props.name}</p>
            <div className="matrix-row-elems">
            {[...Array(MAT_ROW_LEN)].map((x, i) =>
                <MatrixElem key={i}
                            defaultValue={props.defaultValue}
                            min={props.min}
                            max={props.max}
                 />
            )}
            </div>
        </div>
    )
}

export default MatrixRow