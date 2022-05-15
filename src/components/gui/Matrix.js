import React from "react"
import MatrixRow from "./MatrixRow"

const Matrix = () => {
    return (
        <div className="matrix">
            <MatrixRow name="Translate" defaultValue="0.00" min="-100.00" max="100.00" />
            <MatrixRow name="Rotate" defaultValue="0.00" min="-360.00" max="360.00"/>
            <MatrixRow name="Scale" defaultValue="1.00" min="0.00" max="10.00"/>
        </div>
    )
}

export default Matrix