import React from "react"
import MatrixElem from "./MatrixElem"
import { MATRIX_ROW_LENGTH } from "./../../constants/constants";

const MatrixRow = (props) => {
    return (
        <div className="matrix-row-container">
            <p className="matrix-row-name">{props.name}</p>
            <div className="matrix-row-elems">
            {[...Array(MATRIX_ROW_LENGTH)].map((x, i) =>
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