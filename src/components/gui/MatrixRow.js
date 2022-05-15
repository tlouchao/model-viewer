import React from "react"
import MatrixElem from "./MatrixElem"

const MatrixRow = () => {
    return (
        <div className="matrix-row-container">
            <p className="matrix-row-name">Translate</p>
            <div className="matrix-row-elems">
                <MatrixElem />
                <MatrixElem />
                <MatrixElem />
            </div>
        </div>
    )
}

export default MatrixRow